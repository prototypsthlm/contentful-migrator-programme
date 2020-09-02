require('dotenv').config()
const fs = require('fs')
const { join } = require('path')
const { runMigration } = require('contentful-migration/built/bin/cli')
const { utcTimestamp } = require('../lib/date')
const spaceModule = require('../lib/contentful-space-manager')
const env = require('../lib/env')
const serialize = require('serialize-javascript')
const tmp = require('tmp')

const AUX_SPACE_ENV = utcTimestamp({ dashes: true })
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

const getNameFromFileName = (filename) => {
    const matches = filename.match(/^\d{17}-([^.]+)/)
    return (matches && matches[1]) || null
}

const getMigrationsToApply = async (space, options) => {
    const appliedMigrationTimestamps = await getMigratedTimestamps(space)

    let fullMigrations
    if (options.rollback) {
        const latestAppliedMigration = fs.readdirSync(MIGRATIONS_DIR).find((file) => {
            const timestamp = getTimestampFromFileName(file)
            return timestamp && appliedMigrationTimestamps.includes(timestamp)
        })
        fullMigrations = latestAppliedMigration ? [latestAppliedMigration] : []
    } else {
        fullMigrations = fs.readdirSync(MIGRATIONS_DIR).filter((file) => {
            const timestamp = getTimestampFromFileName(file)
            return timestamp && !appliedMigrationTimestamps.includes(timestamp)
        })
    }

    return fullMigrations.map((f) => {
        return extractFunctionToSeparateFile(f, options.rollback ? 'down' : 'up')
    })
}

function extractFunctionToSeparateFile(filePath, direction) {
    const migrationFile = join(MIGRATIONS_DIR, filePath) // TODO Assumes a file structure that might not be correct
    const upAndDownFunctions = require(migrationFile)
    if (!(upAndDownFunctions.up && upAndDownFunctions.down)) {
        throw new Error("Each migration module needs to declare both 'up' and 'down' functions")
    }
    const serializedFunction = `module.exports = ${serialize(upAndDownFunctions[direction])}`
    const partialMigrationFile = tmp.fileSync({ prefix: `up-${filePath}`, postfix: '.js' })
    fs.writeFileSync(partialMigrationFile.name, serializedFunction)

    return new Migration(partialMigrationFile.name, getTimestampFromFileName(filePath), getNameFromFileName(filePath))
}

const migrate = async (migrations, envId) => {
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

const updateBookkeeping = async (space, migratedMigrations, options) => {
    if (options.rollback) {
        const appliedMigrationEntries = await space.getEntries(MIGRATIONS_TYPE)
        const migratedTimestamps = migratedMigrations.map((m) => m.timestamp)
        return Promise.all(
            appliedMigrationEntries
                .filter((appliedMigration) => {
                    return migratedTimestamps.includes(appliedMigration.fields.timestamp[space.locale])
                })
                .map((entry) => entry.unpublish().then((entry) => entry.delete()))
        )
    }

    return Promise.all(
        migratedMigrations.map((migration) =>
            space.createEntry(MIGRATIONS_TYPE, {
                timestamp: migration.timestamp,
                name: migration.name,
            })
        )
    )
}

class Migration {
    constructor(fileName, timestamp, name) {
        this.fileName = fileName
        this.timestamp = timestamp
        this.name = name
    }
}

module.exports = async (options) => {
    const spaceMasterEnv = await spaceModule(env('CTF_SPACE'), env('CTF_ENVIRONMENT'), env('CTF_CMA_TOKEN'))
    const auxEnv = options.testEnv || AUX_SPACE_ENV

    try {
        // abort if max env amount reached, to prevent failures
        // (or wait and retry if in ci? so the build doesnt fail
        // if someone is migrating somewhere else)
        const envs = await spaceMasterEnv.getEnvironments()
        if (envs.items.length >= ENV_AMOUNT + ALIAS_AMOUNT) {
            console.error('Maximum environment amount reached. Aborting.')
            return
        }

        const migrationsToApply = await getMigrationsToApply(spaceMasterEnv, options)

        if (!migrationsToApply.length) {
            console.info('No new migrations to apply.')
            if (!options.testEnv) {
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
            await updateBookkeeping(spaceAuxEnv, migrationsToApply, options)
            console.info('All new migrations applied.')
        }

        if (!options.testEnv) {
            const currentEnv = await spaceMasterEnv.getCurrentEnvironmentOfAlias(env('CTF_ENVIRONMENT'))
            await spaceMasterEnv.switchEnvOfAlias(env('CTF_ENVIRONMENT'), auxEnv)
            await spaceMasterEnv.deleteSpaceEnv(currentEnv.sys.id)
            console.info('Environment switched successfully.')
        }
    } catch (e) {
        await spaceMasterEnv.deleteSpaceEnv(auxEnv)
        throw e
    }
}
