#! /usr/bin/env node

require('dotenv').config()

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
        if (process.env.CTF_ENVIRONMENT === 'master' && !force) {
            console.error('Executing migrations against master requires the --force flag.')
        }
        await require('../../migrator')()
    } catch (e) {
        process.exitCode = 1
    }
}
