#! /usr/bin/env node

const fs = require('fs')
const { join } = require('path')
const Mustache = require('mustache')
const { utcTimestampMs } = require('../../lib/date')
const { camelToKebabCase } = require('../../lib/string')
const env = require('../../lib/env')
const log = require('../../lib/log')

exports.command = 'generate <name>'

exports.desc = 'Generates a migration file with the timestamp prepended in the filename.'

exports.builder = (yargs) => {
  yargs.positional('name', {
    describe: 'The name of the migration file.',
    type: 'string',
  })
}

exports.handler = ({ name }) => {
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
