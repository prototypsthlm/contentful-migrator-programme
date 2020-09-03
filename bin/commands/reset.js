#! /usr/bin/env node

require('dotenv').config()
const spaceModule = require('../../lib/contentful-space-manager')
const env = require('../../lib/env')

exports.command = 'reset'

exports.desc = 'Resets current CTF_ENVIRONMENT_ID to master.'

exports.handler = async () => {
    try {
        if (env('CTF_ENVIRONMENT_ID') === 'master') {
            console.error(`Can't reset environment if you are on master.`)
            return
        }

        const space = await spaceModule(env('CTF_SPACE_ID'), env('CTF_ENVIRONMENT_ID'), env('CTF_CMA_TOKEN'))

        console.info(`Deleting ${env('CTF_ENVIRONMENT_ID')} environment.`)
        await space.deleteSpaceEnv(env('CTF_ENVIRONMENT_ID'))
        console.info(`Deleted ${env('CTF_ENVIRONMENT_ID')} environment.`)

        console.info(`Creating ${env('CTF_ENVIRONMENT_ID')} environment cloning from master.`)
        await space.createSpaceEnv(env('CTF_ENVIRONMENT_ID'), 'master')
        console.info(`Created ${env('CTF_ENVIRONMENT_ID')} environment.`)

        console.info(`Updating API key to work with the recreated env`)
        await space.updateApiKeysAccessToNewEnv(env('CTF_ENVIRONMENT_ID'))
        console.info(`Updated API key to work with the recreated env`)
    } catch (e) {
        console.error(e)
        process.exitCode = 1
    }
}
