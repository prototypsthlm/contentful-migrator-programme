#! /usr/bin/env node

require('dotenv').config()
const { create, drop } = require('../../src/migrator')
const { utcTimestamp } = require('../../lib/date')

exports.command = 'aux:test'

exports.desc = 'Creates a temporary environment based on CTF_ENVIRONMENT, applies any pending migration and then is immediately deleted.'

exports.handler = async () => {
    try {
        const testEnv = 'test' + utcTimestamp()
        await create({ newEnvId: testEnv })
        await drop({ envId: testEnv })
        console.info(`${testEnv} environment deleted in contentful.`)
    } catch (e) {
        console.error(e)
        process.exitCode = 1
    }
}
