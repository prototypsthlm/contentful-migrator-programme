require('dotenv').config()
const fs = require('fs')
const { join } = require('path')
const { runMigration } = require('contentful-migration/built/bin/cli')
const spaceModule = require('./lib/contentful-space-manager')

const MIGRATIONS_TYPE = 'migrations'
const MIGRATIONS_DIR = 'migrations'

const getMigratedTimestamps = async (space) => {
  try {
    const migrations = await space.getEntries(MIGRATIONS_TYPE)
    return migrations.map((x) => x.fields.timestamp[space.locale])
  } catch (e) {
    return []
  }
}

const migrateMigrationsType = async (env) => {
  await runMigration({
    filePath: join(__dirname, 'migrations-content-type.js'),
    spaceId: process.env.CTF_SPACE,
    accessToken: process.env.CTF_CMA_TOKEN,
    environmentId: env,
    yes: true,
  })
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

const getMigrationsToApply = async (space) => {
  const timestamps = await getMigratedTimestamps(space)
  return fs
    .readdirSync(join(__dirname, '..', MIGRATIONS_DIR))
    .filter((file) => {
      const timestamp = getTimestampFromFileName(file)
      return timestamp && !timestamps.includes(timestamp)
    })
}

const migrate = async (migrations, env) => {
  for (const migration of migrations) {
    await runMigration({
      filePath: join(__dirname, '..', MIGRATIONS_DIR, migration),
      spaceId: process.env.CTF_SPACE,
      accessToken: process.env.CTF_CMA_TOKEN,
      environmentId: env,
      yes: true,
    })
  }
}

const saveMigratedTimestamps = (space, migratedMigrations) => {
  return Promise.all(
    migratedMigrations.map((migration) =>
      space.createEntry(MIGRATIONS_TYPE, {
        timestamp: getTimestampFromFileName(migration),
      })
    )
  )
}

module.exports = async () => {
  const space = await spaceModule(
    process.env.CTF_SPACE,
    process.env.CTF_ENVIRONMENT,
    process.env.CTF_CMA_TOKEN
  )

  const migrationsToApply = await getMigrationsToApply(space)

  // migrate the migrations type if it doesnt exist
  if (!(await space.typeExists(MIGRATIONS_TYPE))) {
    console.info('Creating migrations type.')
    await migrateMigrationsType(space)
    console.info('Migrations type created.')
  }

  // migrate if there's migrations to apply
  if (migrationsToApply.length) {
    console.info('Applying all new migrations.')
    await migrate(migrationsToApply, space.env.sys.id)
    await saveMigratedTimestamps(space, migrationsToApply)
    console.info('All new migrations applied.')
  } else {
    console.info('No new migrations to apply.')
  }
}
