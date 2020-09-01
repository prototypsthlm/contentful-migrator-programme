require('dotenv').config()
const migrator = require('../../src/migrator')
const { utcTimestamp } = require('../../lib/date')
const spaceManager = require('../../lib/contentful-space-manager')
const env = require('../../lib/env')

exports.command = 'aux:test'

exports.desc = 'Creates a temporary environment based on CTF_ENVIRONMENT, applies any pending migration and then is immediately deleted.'

exports.handler = async () => {
    try {
        const testEnv = 'test' + utcTimestamp()
        await migrator(testEnv)
        const space = await spaceManager(env('CTF_SPACE'), testEnv, env('CTF_CMA_TOKEN'))
        await space.deleteSpaceEnv(testEnv)
        console.info(`${testEnv} environment deleted in contentful.`)
    } catch (e) {
        console.error(e)
        process.exitCode = 1
    }
}
