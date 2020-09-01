require('dotenv').config();
const fs = require('fs');
const { join } = require('path');
const { runMigration } = require('contentful-migration/built/bin/cli');
const { utcTimestamp } = require('./lib/date');
const spaceModule = require('./lib/contentful-space-manager');

const AUX_SPACE_ENV = utcTimestamp({ dashes: true });
const MIGRATIONS_TYPE = 'migrations';
const MIGRATIONS_DIR = 'migrations';
const MAX_ENV_AMOUNT = 3;
const ALIAS_AMOUNT = 1;

const getMigratedTimestamps = async (space) => {
    try {
        const migrations = await space.getEntries(MIGRATIONS_TYPE);
        return migrations.map((x) => x.fields.timestamp[space.locale]);
    } catch (e) {
        return [];
    }
};

const migrateMigrationsType = async (env) => {
    await runMigration({
        filePath: join(__dirname, 'migrations-content-type.js'),
        spaceId: process.env.CTF_SPACE,
        accessToken: process.env.CTF_CMA_TOKEN,
        environmentId: env,
        yes: true
    });
};

/**
 * Gets the timestamp from a filename such as '20200211111800525-create-cars-type.js'
 *
 * @param {string} filename
 * @returns {string|null} the timestamp if match, null otherwise
 */
const getTimestampFromFileName = (filename) => {
    const matches = filename.match(/(^\d{17})-/);
    return (matches && matches[1]) || null;
};

const getMigrationsToApply = async (space) => {
    const timestamps = await getMigratedTimestamps(space);
    return fs
        .readdirSync(join(__dirname, '..', MIGRATIONS_DIR))
        .filter((file) => {
            const timestamp = getTimestampFromFileName(file);
            return timestamp && !timestamps.includes(timestamp);
        });
};

const migrate = async (migrations, env) => {
    for (const migration of migrations) {
        await runMigration({
            filePath: join(__dirname, '..', MIGRATIONS_DIR, migration),
            spaceId: process.env.CTF_SPACE,
            accessToken: process.env.CTF_CMA_TOKEN,
            environmentId: env,
            yes: true
        });
    }
};

const saveMigratedTimestamps = (space, migratedMigrations) => {
    return Promise.all(
        migratedMigrations.map((migration) =>
            space.createEntry(MIGRATIONS_TYPE, {
                timestamp: getTimestampFromFileName(migration)
            })
        )
    );
};

module.exports = async (testEnv) => {
    const spaceMasterEnv = await spaceModule(
        process.env.CTF_SPACE,
        process.env.CTF_ENVIRONMENT,
        process.env.CTF_CMA_TOKEN
    );
    const auxEnv = testEnv || AUX_SPACE_ENV;

    try {
        // abort if max env amount reached, to prevent failures
        // (or wait and retry if in ci? so the build doesnt fail
        // if someone is migrating somewhere else)
        const envs = await spaceMasterEnv.getEnvironments();
        if (envs.items.length >= MAX_ENV_AMOUNT + ALIAS_AMOUNT) {
            throw new Error('Maximum environment amount reached. Aborting.');
        }

        const migrationsToApply = await getMigrationsToApply(spaceMasterEnv);

        if (!migrationsToApply.length) {
            console.info('No new migrations to apply.');
            if (!testEnv) {
                return;
            }
        }

        await spaceMasterEnv.createSpaceEnv(auxEnv, process.env.CTF_ENVIRONMENT);

        await spaceMasterEnv.updateApiKeysAccessToNewEnv(auxEnv);

        const spaceAuxEnv = await spaceModule(
            process.env.CTF_SPACE,
            auxEnv,
            process.env.CTF_CMA_TOKEN
        );

        if (!(await spaceAuxEnv.typeExists(MIGRATIONS_TYPE))) {
            await migrateMigrationsType(auxEnv);
        }

        if (migrationsToApply.length) {
            await migrate(migrationsToApply, auxEnv);
            await saveMigratedTimestamps(spaceAuxEnv, migrationsToApply);
            console.info('All new migrations applied.');
        }

        if (!testEnv) {
            const currentEnv = await spaceMasterEnv.getCurrentEnvironmentOfAlias(
                process.env.CTF_ENVIRONMENT
            );
            await spaceMasterEnv.switchEnvOfAlias(process.env.CTF_ENVIRONMENT, auxEnv);
            await spaceMasterEnv.deleteSpaceEnv(currentEnv.sys.id);
            console.info('Environment switched successfully.');
        }
    } catch (e) {
        console.error(e);
        await spaceMasterEnv.deleteSpaceEnv(auxEnv);
        throw e;
    }
};
