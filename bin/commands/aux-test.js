require('dotenv').config()
const { utcTimestamp } = require('../../lib/date')
const spaceManager = require('../../lib/contentful-space-manager')

exports.command = 'aux:test'

exports.desc = 'Creates a temporary environment based on CTF_ENVIRONMENT, applies any pending migration and then is immediately deleted.'

exports.handler = async () => {
    try {
        const testEnv = 'test' + utcTimestamp()
        await require('../../migrator')(testEnv)
        const space = await spaceManager(process.env.CTF_SPACE, testEnv, process.env.CTF_CMA_TOKEN)
        await space.deleteSpaceEnv(testEnv)
        console.info(`${testEnv} environment deleted in contentful.`)
    } catch (e) {
        process.exitCode = 1
    }
}
