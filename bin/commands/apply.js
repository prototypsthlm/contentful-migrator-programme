#! /usr/bin/env node

require('dotenv').config()
const migrator = require('../../src/migrator')
const env = require('../../lib/env')

exports.command = 'apply'

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
        if (env('CTF_ENVIRONMENT') === 'master' && !force) {
            console.error('Executing migrations against master requires the --force flag.')
            return
        }
        await migrator()
    } catch (e) {
        console.error(e)
        process.exitCode = 1
    }
}
