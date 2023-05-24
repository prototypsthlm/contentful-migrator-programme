import { join } from 'path';
import { runMigration } from 'contentful-migration/built/bin/cli.js'
import env from '../lib/env.js'
import log from '../lib/log.js';

const APPLIED_MIGRATIONS_TYPE_ID = env('APPLIED_MIGRATIONS_TYPE_ID')

export const initBookkeeping = async (space) => {
    if (!(await space.typeExists(APPLIED_MIGRATIONS_TYPE_ID))) {
        log.info('`Applied migrations` type not found. Creating it.')
        await migrateMigrationsType(space.env.sys.id)
        log.success('`Applied migrations` type created.')
    }
}

export const updateBookkeeping = async (space, migratedMigrations, options = {}) => {
    if (options.rollback) {
        const allAppliedMigrationEntries = await space.getEntries(APPLIED_MIGRATIONS_TYPE_ID)
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
            space.createEntry(APPLIED_MIGRATIONS_TYPE_ID, {
                timestamp: migration.timestamp,
                name: migration.name,
                batch: newBatchNumber,
            })
        )
    )
}

export const migrateMigrationsType = async (envId) => {
    await runMigration({
        filePath: join(__dirname, 'migrations-type.js'),
        spaceId: env('CTF_SPACE_ID'),
        accessToken: env('CTF_CMA_TOKEN'),
        environmentId: envId,
        yes: true,
    })
}

export const getLatestBatchNumber = async (space) => {
    const initialBatchNumber = 0
    return (await getAppliedMigrationEntries(space))
        .map((item) => item.fields.batch[space.locale])
        .reduce((a, b) => Math.max(a, b), initialBatchNumber)
}

export const getMigrationTimestampsForBatch = async (space, batchNumber) => {
    return (await space.getEntries(APPLIED_MIGRATIONS_TYPE_ID, { 'fields.batch': batchNumber })).map(
        (item) => item.fields.timestamp[space.locale]
    )
}

export const getAppliedMigrationEntries = async (space) => {
    return space.getEntries(APPLIED_MIGRATIONS_TYPE_ID)
}

export const getMigratedTimestamps = async (space) => {
    return (await getAppliedMigrationEntries(space)).map((x) => x.fields.timestamp[space.locale])
}
