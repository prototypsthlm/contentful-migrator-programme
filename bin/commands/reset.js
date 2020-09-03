#! /usr/bin/env node

require('dotenv').config()
const spaceModule = require('../../lib/contentful-space-manager')
const env = require('../../lib/env')

exports.command = 'reset'

exports.desc = 'Resets current CTF_ENVIRONMENT to master.'

exports.handler = async () => {
    try {
        if (env('CTF_ENVIRONMENT') === 'master') {
            console.error(`Can't reset environment if you are on master.`)
            return
        }

        const space = await spaceModule(env('CTF_SPACE'), env('CTF_ENVIRONMENT'), env('CTF_CMA_TOKEN'))

        console.info(`Deleting ${env('CTF_ENVIRONMENT')} environment.`)
        await space.deleteSpaceEnv(env('CTF_ENVIRONMENT'))
        console.info(`Deleted ${env('CTF_ENVIRONMENT')} environment.`)

        console.info(`Creating ${env('CTF_ENVIRONMENT')} environment cloning from master.`)
        await space.createSpaceEnv(env('CTF_ENVIRONMENT'), 'master')
        console.info(`Created ${env('CTF_ENVIRONMENT')} environment.`)

        console.info(`Updating API key to work with the recreated env`)
        await space.updateApiKeysAccessToNewEnv(env('CTF_ENVIRONMENT'))
        console.info(`Updated API key to work with the recreated env`)
    } catch (e) {
        console.error(e)
        process.exitCode = 1
    }
}