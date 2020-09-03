const { join } = require('path')
const { runMigration } = require('contentful-migration/built/bin/cli')
require('../lib/contentful-space-manager')
const env = require('../lib/env')

const MIGRATIONS_TYPE = env('MIGRATIONS_TYPE')

const initBookkeeping = async (space) => {
    if (!(await space.typeExists(MIGRATIONS_TYPE))) {
        console.info('`Applied migrations` type not found. Creating it.')
        await migrateMigrationsType(space.env.sys.id)
        console.info('`Applied migrations` type created.')
    }
}

const updateBookkeeping = async (space, migratedMigrations, options = {}) => {
    if (options.rollback) {
        const allAppliedMigrationEntries = await space.getEntries(MIGRATIONS_TYPE)
        const migratedTimestamps = migratedMigrations.map((m) => m.timestamp)
        return Promise.all(
            allAppliedMigrationEntries
                .filter((appliedMigration) => migratedTimestamps.includes(appliedMigration.fields.timestamp[space.locale]))
                .map((entry) => entry.unpublish().then((entry) => entry.delete()))
        )
    }

    const newBatchNumber = (await getLatestBatchNumber(space)) + 1

    return Promise.all(
        migratedMigrations.map((migration) =>
            space.createEntry(MIGRATIONS_TYPE, {
                timestamp: migration.timestamp,
                name: migration.name,
                batch: newBatchNumber,
            })
        )
    )
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

const getLatestBatchNumber = async (space) => {
    const initialBatchNumber = 0
    const allAppliedMigrationEntries = await space.getEntries(MIGRATIONS_TYPE)
    return allAppliedMigrationEntries.map((item) => item.fields.batch[space.locale]).reduce((a, b) => Math.max(a, b), initialBatchNumber)
}

const getMigrationTimestampsForBatch = async (space, batchNumber) => {
    return (await space.getEntries(MIGRATIONS_TYPE, { 'fields.batch': batchNumber })).map((item) => item.fields.timestamp[space.locale])
}

module.exports = {
    updateBookkeeping,
    initBookkeeping,
    getLatestBatchNumber,
    getMigrationTimestampsForBatch,
}
