#!/usr/bin/env node

import fs from 'fs';
import {join} from 'path';
import Mustache from 'mustache';
//import {utcTimestampMs} from '../../lib/date';
/*import {camelToKebabCase} from '../../lib/string';
import env from '../../lib/env';
import log from '../../lib/log';*/
import {utcTimestampMs} from "@prototyp-stockholm/contentful-migrator-programme/lib/date.js";
import {camelToKebabCase} from "@prototyp-stockholm/contentful-migrator-programme/lib/string.js";
import env from "@prototyp-stockholm/contentful-migrator-programme/lib/env.js";

export const command = 'generate <name>';

export const desc = 'Generates a migration file with the timestamp prepended in the filename.';

export const builder = (yargs) => {
    yargs.positional('name', {
        describe: 'The name of the migration file.',
        type: 'string',
    });
};

export const handler = async ({name}) => {
    try {
        const templatePath = await fs.promises.readFile(
            join(__dirname, '..', '..', 'templates', 'migration.mustache'),
            'utf8'
        );
        const migrationContents = Mustache.render(templatePath);
        const migrationFileName = `${utcTimestampMs()}-${camelToKebabCase(name)}.js`;
        const migrationsDir = env('MIGRATIONS_DIR');

        await fs.promises.mkdir(migrationsDir, {recursive: true});

        const migrationPath = join(migrationsDir, migrationFileName);

        await fs.promises.writeFile(migrationPath, migrationContents, {flag: 'w'});

        log.success(`Migration file ${migrationFileName} created`);
    } catch (e) {
        log.error('Migration file creation failed.', e);
        process.exitCode = 1;
    }
};