#! /usr/bin/env node

require('dotenv').config()
const { apply } = require('../../src/migrator')
const env = require('../../lib/env')
const log = require('../../lib/log')

exports.command = 'migrate'

exports.desc = 'Apply migrations.'

exports.builder = (yargs) => {
  yargs.option('force', {
    alias: 'f',
    describe: 'Required to run them against master environment.',
    type: 'boolean',
  })
}

exports.handler = async ({ force }) => {
  try {
    if (env('CTF_ENVIRONMENT_ID') === 'master' && !force) {
      log.error('Executing migrations against master requires the --force flag.')
      return
    }

    await apply({ rollback: false })
  } catch (e) {
    log.error(e)
    process.exitCode = 1
  }
}
