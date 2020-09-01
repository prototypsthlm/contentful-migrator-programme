#! /usr/bin/env node

require('dotenv').config()
const { utcTimestamp } = require('../../lib/date')

exports.command = 'aux:create'

exports.desc = 'Creates an auxiliary environment based on CTF_ENVIRONMENT and apples newer migrations to it.'

exports.builder = (yargs) => {
    yargs.option('name', {
        alias: 'n',
        describe: 'Specify an optional name for the auxiliary environment.',
        type: 'string',
        default: 'test' + utcTimestamp(),
    })
}

exports.handler = async ({ name }) => {
    try {
        await require('../../migrator')(name)
        console.info('###########################################')
        console.info('Contentful test environment:', name)
        console.info('###########################################')
        console.info(
            `Configure that into your local "CTF_ENVIRONMENT" to test out and remember to delete it after with: "cmp aux:drop ${name}"`
        )
    } catch (e) {
        process.exitCode = 1
    }
}
