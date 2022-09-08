require('dotenv').config()
const chalk = require('chalk')
const fs = require('fs')
const serialize = require('serialize-javascript')
const tmp = require('tmp')
const { join } = require('path')
const { runMigration } = require('contentful-migration')
const spaceModule = require('../lib/contentful-space-manager')
const env = require('../lib/env')
const { utcTimestamp } = require('../lib/date')
const {
  getLatestBatchNumber,
  getMigratedTimestamps,
  getMigrationTimestampsForBatch,
  initBookkeeping,
  updateBookkeeping,
} = require('./bookkeeping')
const log = require('../lib/log')

const MIGRATIONS_DIR = join(process.cwd(), env('MIGRATIONS_DIR'))
const MAX_NUMBER_OF_ENVIRONMENTS = parseInt(env('MAX_NUMBER_OF_ENVIRONMENTS'), 10)
const MAX_NUMBER_OF_ALIASES = parseInt(env('MAX_NUMBER_OF_ALIASES'), 10)

/**
 * Gets the timestamp from a filename such as '20200211111800525-create-cars-type.js'
 *
 * @param {string} filename
 * @returns {string|null} the timestamp if matched, null otherwise
 */
const getTimestampFromFileName = (filename) => {
  const matches = filename.match(/(^\d{17})-/)
  return (matches && matches[1]) || null
}

const getNameFromFileName = (filename) => {
  const matches = filename.match(/^\d{17}-([^.]+)/)
  return (matches && matches[1]) || null
}

class Migration {
  constructor(fileName, timestamp, name) {
    this.fileName = fileName
    this.timestamp = timestamp
    this.name = name
  }

  toString = () => `${this.timestamp} - ${this.name}`
}

export const list = async (space) => {
  const migratedTimestamps = await getMigratedTimestamps(space)
  return fs
    .readdirSync(MIGRATIONS_DIR)
    .filter((file) => {
      const timestamp = getTimestampFromFileName(file)
      return timestamp && migratedTimestamps.includes(timestamp)
    })
    .map((file) => new Migration(file, getTimestampFromFileName(file), getNameFromFileName(file)))
}

const extractFunctionToSeparateFile = (filePath, direction) => {
  // eslint-disable-next-line global-require,import/no-dynamic-require
  const upAndDownFunctions = require(join(MIGRATIONS_DIR, filePath))
  if (!(upAndDownFunctions.up && upAndDownFunctions.down)) {
    throw new Error('Each migration module needs to declare both "up" and "down" functions')
  }
  const serializedFunction = `module.exports = ${serialize(upAndDownFunctions[direction])}`
  const partialMigrationFile = tmp.fileSync({ prefix: `up-${filePath}`, postfix: '.js' })
  fs.writeFileSync(partialMigrationFile.name, serializedFunction)

  return new Migration(
    partialMigrationFile.name,
    getTimestampFromFileName(filePath),
    getNameFromFileName(filePath)
  )
}

const getUpMigration = (migrationFunction) => extractFunctionToSeparateFile(migrationFunction, 'up')

const getDownMigration = (migrationFunction) =>
  extractFunctionToSeparateFile(migrationFunction, 'down')

const getMigrationsToHandle = async (space, options = {}) => {
  // Take only `19990101235959111-migration-name.js` files
  const allMigrations = fs.readdirSync(MIGRATIONS_DIR).filter((file) => /^\d{17}.*\.js$/.test(file))

  // Rolling back
  if (options.rollback) {
    if (options.targetMigrationTimestamp) {
      return (await list(space))
        .filter((m) => Number(m.timestamp) > Number(options.targetMigrationTimestamp))
        .map((m) => getDownMigration(m.fileName))
    }

    const latestBatchNumber = await getLatestBatchNumber(space)
    const latestBatchMigrationTimestamps = await getMigrationTimestampsForBatch(
      space,
      latestBatchNumber
    )
    const fullMigrationsToRun = allMigrations.filter((file) => {
      const timestamp = getTimestampFromFileName(file)
      return timestamp && latestBatchMigrationTimestamps.includes(timestamp)
    })

    return fullMigrationsToRun.map(getDownMigration)
  }

  // Rolling forward
  const appliedMigrationTimestamps = await getMigratedTimestamps(space)
  const fullMigrationsToRun = allMigrations.filter((file) => {
    const timestamp = getTimestampFromFileName(file)
    return timestamp && !appliedMigrationTimestamps.includes(timestamp)
  })

  return fullMigrationsToRun.map(getUpMigration)
}

const runMigrations = async (migrations, envId) => {
  await Promise.all(
    migrations.map((migration) =>
      runMigration({
        filePath: migration.fileName,
        spaceId: env('CTF_SPACE_ID'),
        accessToken: env('CTF_CMA_TOKEN'),
        environmentId: envId,
        yes: true,
      })
    )
  )
}

const migrate = async (space, options = {}) => {
  await initBookkeeping(space)

  const migrationsToApply = await getMigrationsToHandle(space, options)

  if (!migrationsToApply.length) {
    log.info(`No migrations to ${options.rollback ? 'rollback' : 'apply'}.`)
    return
  }

  log.info(options.rollback ? 'Rolling back.' : 'Migrating.')
  await runMigrations(migrationsToApply, space.env.sys.id)
  await updateBookkeeping(space, migrationsToApply, options)
  log.info(options.rollback ? 'Rolled back.' : 'Migrated.')
}

const delay = (time) =>
  new Promise((resolve) => {
    setTimeout(resolve, time)
  })

export const tryGetEnv = async (envId, retries) => {
  try {
    return await spaceModule(env('CTF_SPACE_ID'), envId, env('CTF_CMA_TOKEN'))
  } catch (e) {
    if (retries > 0) {
      const waitingSeconds = 500
      log.warn('Env not ready yet.')
      log.warn(`Waiting ${waitingSeconds} ms and retrying.`)
      await delay(waitingSeconds)
      return tryGetEnv(envId, retries - 1)
    }
    throw e
  }
}
const createEnv = async (space, envId) => {
  log.info(`Creating environment ${envId}.`)
  await space.createSpaceEnv(envId, env('CTF_ENVIRONMENT_ID'))
  log.success(`Environment ${envId} created.`)

  log.info(`Updating api key access to new env ${envId}.`)
  await space.updateApiKeysAccessToNewEnv(envId)
  log.success(`Api key access to new env ${envId} updated.`)

  return tryGetEnv(envId, 10)
}

const switchEnvAliasAndDropOldEnv = async (space, auxEnv) => {
  log.info('Switching environment alias.')
  const currentEnv = await space.getCurrentEnvironmentOfAlias(env('CTF_ENVIRONMENT_ID'))
  await space.switchEnvOfAlias(env('CTF_ENVIRONMENT_ID'), auxEnv)
  await space.deleteSpaceEnv(currentEnv.sys.id)
  log.info('Environment alias switched successfully.')
}

const isEnvLimitReached = async (space) => {
  const envs = await space.getEnvironments()
  if (envs.items.length >= MAX_NUMBER_OF_ENVIRONMENTS + MAX_NUMBER_OF_ALIASES) {
    log.error('Maximum environment amount reached. Aborting.')
    return true
  }
  return false
}

export const apply = async (options = {}) => {
  const space = await spaceModule(
    env('CTF_SPACE_ID'),
    env('CTF_ENVIRONMENT_ID'),
    env('CTF_CMA_TOKEN')
  )

  await initBookkeeping(space)

  const migrationsToHandle = await getMigrationsToHandle(space, options)

  if (!migrationsToHandle.length) {
    log.info(`No migrations to ${options.rollback ? 'rollback' : 'apply'}.`)
    return
  }

  if (options.rollback) {
    log.info(`About to rollback the following migrations:\n  ${migrationsToHandle.join('\n  ')}`)
  } else {
    log.info(`About to apply the following migrations:\n  ${migrationsToHandle.join('\n  ')}`)
  }

  if (env('CTF_ENVIRONMENT_ID') === 'master') {
    const newEnvId = utcTimestamp({ dashes: true })

    try {
      if (await isEnvLimitReached(space)) {
        return
      }

      const spaceNewEnv = await createEnv(space, newEnvId)
      await migrate(spaceNewEnv, options)
      await switchEnvAliasAndDropOldEnv(space, newEnvId)
      return
    } catch (e) {
      await space.deleteSpaceEnv(newEnvId)
      throw e
    }
  }

  await migrate(space, options)
}

export const create = async ({ newEnvId }) => {
  const space = await spaceModule(
    env('CTF_SPACE_ID'),
    env('CTF_ENVIRONMENT_ID'),
    env('CTF_CMA_TOKEN')
  )

  if (await space.environmentExists(newEnvId)) {
    log.error(`An environment with id ${newEnvId} already exists.`)
    return
  }

  if (await isEnvLimitReached(space)) {
    return
  }

  try {
    const spaceNewEnv = await createEnv(space, newEnvId)

    await migrate(spaceNewEnv)

    console.group()
    log.success('###########################################')
    log.success(`Contentful test environment \`${chalk.blue(newEnvId)}\` created`)
    log.success('###########################################')
    console.groupEnd()

    console.group()
    log.warn('Configure that into your local "CTF_ENVIRONMENT_ID" to test out')
    log.warn(`And remember to delete it after with: "cmp aux:drop ${newEnvId}"`)
    console.groupEnd()
  } catch (e) {
    await space.deleteSpaceEnv(newEnvId)
    throw e
  }
}

export const drop = async ({ envId }) => {
  const space = await spaceModule(env('CTF_SPACE_ID'), envId, env('CTF_CMA_TOKEN'))
  await space.deleteSpaceEnv(envId)
}
