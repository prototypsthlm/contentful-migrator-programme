require('dotenv').config()
const fs = require('fs')
const { join } = require('path')
const { runMigration } = require('contentful-migration/built/bin/cli')
const { utcTimestamp } = require('./lib/date')
const spaceModule = require('./lib/contentful-space-manager')
const env = require('./lib/env')

const AUX_SPACE_ENV = utcTimestamp({ dashes: true })
const MIGRATIONS_TYPE = env('MIGRATIONS_TYPE')
const MIGRATIONS_DIR = env('MIGRATIONS_DIR')
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

const migrateMigrationsType = async (envId) => {
    await runMigration({
        filePath: join(__dirname, 'migrations-type.js'),
        spaceId: env('CTF_SPACE'),
        accessToken: env('CTF_CMA_TOKEN'),
        environmentId: envId,
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
    // return fs.readdirSync(join(__dirname, '..', MIGRATIONS_DIR)).filter((file) => {
    return fs.readdirSync(join(__dirname, MIGRATIONS_DIR)).filter((file) => {
        const timestamp = getTimestampFromFileName(file)
        return timestamp && !timestamps.includes(timestamp)
    })
}

const migrate = async (migrations, envId) => {
    for (const migration of migrations) {
        await runMigration({
            // filePath: join(__dirname, '..', MIGRATIONS_DIR, migration),
            filePath: join(__dirname, MIGRATIONS_DIR, migration),
            spaceId: env('CTF_SPACE'),
            accessToken: env('CTF_CMA_TOKEN'),
            environmentId: envId,
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

module.exports = async (testEnv) => {
    const spaceMasterEnv = await spaceModule(env('CTF_SPACE'), env('CTF_ENVIRONMENT'), env('CTF_CMA_TOKEN'))
    const auxEnv = testEnv || AUX_SPACE_ENV

    try {
        // abort if max env amount reached, to prevent failures
        // (or wait and retry if in ci? so the build doesnt fail
        // if someone is migrating somewhere else)
        const envs = await spaceMasterEnv.getEnvironments()
        if (envs.items.length >= ENV_AMOUNT + ALIAS_AMOUNT) {
            throw new Error('Maximum environment amount reached. Aborting.')
        }

        const migrationsToApply = await getMigrationsToApply(spaceMasterEnv)

        if (!migrationsToApply.length) {
            console.info('No new migrations to apply.')
            if (!testEnv) {
                return
            }
        }

        await spaceMasterEnv.createSpaceEnv(auxEnv, env('CTF_ENVIRONMENT'))

        await spaceMasterEnv.updateApiKeysAccessToNewEnv(auxEnv)

        const spaceAuxEnv = await spaceModule(env('CTF_SPACE'), auxEnv, env('CTF_CMA_TOKEN'))

        if (!(await spaceAuxEnv.typeExists(MIGRATIONS_TYPE))) {
            await migrateMigrationsType(auxEnv)
        }

        if (migrationsToApply.length) {
            await migrate(migrationsToApply, auxEnv)
            await saveMigratedTimestamps(spaceAuxEnv, migrationsToApply)
            console.info('All new migrations applied.')
        }

        if (!testEnv) {
            const currentEnv = await spaceMasterEnv.getCurrentEnvironmentOfAlias(env('CTF_ENVIRONMENT'))
            await spaceMasterEnv.switchEnvOfAlias(env('CTF_ENVIRONMENT'), auxEnv)
            await spaceMasterEnv.deleteSpaceEnv(currentEnv.sys.id)
            console.info('Environment switched successfully.')
        }
    } catch (e) {
        console.error(e)
        await spaceMasterEnv.deleteSpaceEnv(auxEnv)
        throw e
    }
}
