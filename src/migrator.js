require('dotenv').config()
const fs = require('fs')
const { join } = require('path')
const { runMigration } = require('contentful-migration/built/bin/cli')
const { utcTimestamp } = require('../lib/date')
const spaceModule = require('../lib/contentful-space-manager')
const env = require('../lib/env')
const serialize = require('serialize-javascript')
const tmp = require('tmp')
const { updateBookkeeping, initBookkeeping, getMigrationTimestampsForBatch, getLatestBatchNumber } = require('./bookkeeping')

const MIGRATIONS_TYPE = env('MIGRATIONS_TYPE')
const MIGRATIONS_DIR = join(process.cwd(), env('MIGRATIONS_DIR'))
const ENV_AMOUNT = env('ENV_AMOUNT')
const ALIAS_AMOUNT = env('ALIAS_AMOUNT')

const getMigratedTimestamps = async (space) => {
    try {
        const migrations = await space.getEntries(MIGRATIONS_TYPE)
        return migrations.map((x) => x.fields.timestamp[space.locale])
    } catch (e) {
        return []
    }
}

/**
 * Gets the timestamp from a filename such as '20200211111800525-create-cars-type.js'
 *
 * @param {string} filename
 * @returns {string|null} the timestamp if match, null otherwise
 */
const getTimestampFromFileName = (filename) => {
    const matches = filename.match(/(^\d{17})-/)
    return (matches && matches[1]) || null
}

const getNameFromFileName = (filename) => {
    const matches = filename.match(/^\d{17}-([^.]+)/)
    return (matches && matches[1]) || null
}

const getMigrationsToHandle = async (space, options = {}) => {
    // Rolling back
    if (options.rollback) {
        const latestBatchNumber = await getLatestBatchNumber(space)
        let latestBatchMigrationTimestamps = await getMigrationTimestampsForBatch(space, latestBatchNumber)
        let fullMigrationsToRun = fs.readdirSync(MIGRATIONS_DIR).filter((file) => {
            const timestamp = getTimestampFromFileName(file)
            return timestamp && latestBatchMigrationTimestamps.includes(timestamp)
        })
        if (fullMigrationsToRun) console.log('About to rollback the following migrations: ' + fullMigrationsToRun.join(', '))
        return fullMigrationsToRun.map(getDownMigration)
    }

    // Rolling forward
    const appliedMigrationTimestamps = await getMigratedTimestamps(space)
    let fullMigrationsToRun = fs.readdirSync(MIGRATIONS_DIR).filter((file) => {
        const timestamp = getTimestampFromFileName(file)
        return timestamp && !appliedMigrationTimestamps.includes(timestamp)
    })
    if (fullMigrationsToRun) console.log('About to apply the following migrations: ' + fullMigrationsToRun.join(', '))
    return fullMigrationsToRun.map(getUpMigration)
}

const getUpMigration = (migrationFunction) => extractFunctionToSeparateFile(migrationFunction, 'up')

const getDownMigration = (migrationFunction) => extractFunctionToSeparateFile(migrationFunction, 'down')

function extractFunctionToSeparateFile(filePath, direction) {
    const upAndDownFunctions = require(join(MIGRATIONS_DIR, filePath))
    if (!(upAndDownFunctions.up && upAndDownFunctions.down)) {
        throw new Error("Each migration module needs to declare both 'up' and 'down' functions")
    }
    const serializedFunction = `module.exports = ${serialize(upAndDownFunctions[direction])}`
    const partialMigrationFile = tmp.fileSync({ prefix: `up-${filePath}`, postfix: '.js' })
    fs.writeFileSync(partialMigrationFile.name, serializedFunction)

    return new Migration(partialMigrationFile.name, getTimestampFromFileName(filePath), getNameFromFileName(filePath))
}

const runMigrations = async (migrations, envId) => {
    for (const migration of migrations) {
        await runMigration({
            filePath: migration.fileName,
            spaceId: env('CTF_SPACE'),
            accessToken: env('CTF_CMA_TOKEN'),
            environmentId: envId,
            yes: true,
        })
    }
}

class Migration {
    constructor(fileName, timestamp, name) {
        this.fileName = fileName
        this.timestamp = timestamp
        this.name = name
    }
}

const migrate = async (space, options = {}) => {
    await initBookkeeping(space)

    const migrationsToApply = await getMigrationsToHandle(space, options)

    if (!migrationsToApply.length) {
        console.info(`No migrations to ${options.rollback ? 'rollback' : 'apply'}.`)
        return
    }

    console.info(options.rollback ? 'Rolling back last migration.' : 'Applying all new migrations.')
    await runMigrations(migrationsToApply, space.env.sys.id)
    await updateBookkeeping(space, migrationsToApply, options)
    console.info(options.rollback ? 'Last migration rolled back.' : 'All new migrations applied.')
}

const createEnv = async (space, envId) => {
    console.info(`Creating environment ${envId}.`)
    await space.createSpaceEnv(envId, env('CTF_ENVIRONMENT'))
    console.info(`Environment ${envId} created.`)

    console.info(`Updating api key access to new env${envId}.`)
    await space.updateApiKeysAccessToNewEnv(envId)
    console.info(`Api key access to new env${envId} updated.`)

    return await spaceModule(env('CTF_SPACE'), envId, env('CTF_CMA_TOKEN'))
}

const switchEnvAliasAndDropOldEnv = async (space, auxEnv) => {
    console.info('Switching environment alias.')
    const currentEnv = await space.getCurrentEnvironmentOfAlias(env('CTF_ENVIRONMENT'))
    await space.switchEnvOfAlias(env('CTF_ENVIRONMENT'), auxEnv)
    await space.deleteSpaceEnv(currentEnv.sys.id)
    console.info('Environment alias switched successfully.')
}

const isEnvLimitReached = async (space) => {
    const envs = await space.getEnvironments()
    if (envs.items.length >= ENV_AMOUNT + ALIAS_AMOUNT) {
        console.error('Maximum environment amount reached. Aborting.')
        return true
    }
    return false
}

const apply = async (options = {}) => {
    const space = await spaceModule(env('CTF_SPACE'), env('CTF_ENVIRONMENT'), env('CTF_CMA_TOKEN'))
    const migrationsToApply = await getMigrationsToHandle(space, options)

    if (!migrationsToApply.length) {
        console.info(`No migrations to ${options.rollback ? 'rollback' : 'apply'}.`)
        return
    }

    if (env('CTF_ENVIRONMENT') === 'master') {
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

const create = async ({ newEnvId }) => {
    const space = await spaceModule(env('CTF_SPACE'), env('CTF_ENVIRONMENT'), env('CTF_CMA_TOKEN'))

    try {
        if (await isEnvLimitReached(space)) {
            return
        }

        const spaceNewEnv = await createEnv(space, newEnvId)

        await migrate(spaceNewEnv)
    } catch (e) {
        await space.deleteSpaceEnv(newEnvId)
        throw e
    }
}

const drop = async ({ envId }) => {
    const space = await spaceModule(env('CTF_SPACE'), envId, env('CTF_CMA_TOKEN'))
    await space.deleteSpaceEnv(envId)
}

module.exports = {
    apply,
    create,
    drop,
}
