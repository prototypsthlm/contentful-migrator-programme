#! /usr/bin/env node

require('dotenv').config()
const { create } = require('../../src/migrator')
const { utcTimestamp } = require('../../lib/date')

exports.command = 'aux:create [name]'

exports.desc = 'Creates an auxiliary environment based on CTF_ENVIRONMENT_ID and applies newer migrations to it.'

exports.builder = (yargs) => {
    yargs.positional('name', {
        describe: 'Specify an optional name for the auxiliary environment.',
        type: 'string',
        default: 'test' + utcTimestamp(),
    })
}

exports.handler = async ({ name }) => {
    try {
        await create({ newEnvId: name })
        console.info('###########################################')
        console.info('Contentful test environment:', name)
        console.info('###########################################')
        console.info('Configure that into your local "CTF_ENVIRONMENT_ID" to test out')
        console.info(`And remember to delete it after with: "cmp aux:drop ${name}"`)
    } catch (e) {
        console.error(e)
        process.exitCode = 1
    }
}
