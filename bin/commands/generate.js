import { join } from 'path'
import Mustache from 'mustache'
import { utcTimestampMs } from '../../lib/date.js'

import env from '../../lib/env.js'
import log from '../../lib/log.js'
import {camelToKebabCase} from "../../lib/string.js"
import * as fs from "fs"

import path from 'path'
import { fileURLToPath } from 'url'

export const command = 'generate <name>'

export const desc = 'Generates a migration file with the timestamp prepended in the filename.'

export const builder = (yargs) => {
    yargs.positional('name', {
        describe: 'The name of the migration file.',
        type: 'string',
    })
}

export const handler = ({ name }) => {
    const __dirname = path.dirname(fileURLToPath(import.meta.url))
    try {
        const templatePath = fs.readFileSync(
            join(__dirname, '..', '..', 'templates', 'migration.mustache'),
            'utf8'
        )

        const migrationContents = Mustache.render(templatePath)
        const migrationFileName = `${utcTimestampMs()}-${camelToKebabCase(name)}.js`
        const migrationsDir = env('MIGRATIONS_DIR')

        fs.mkdir(migrationsDir, { recursive: true }, (err) => {
            if (err) {
                throw err
            }
        })

        const migrationPath = join(migrationsDir, migrationFileName)

        fs.writeFile(migrationPath, migrationContents, { flag: 'w' }, (err) => {
            if (err) {
                throw err
            }
            log.success(`Migration file ${migrationFileName} created`)
        })
    } catch (e) {
        log.error('Migration file creation failed.', e)
        process.exitCode = 1
    }
}
