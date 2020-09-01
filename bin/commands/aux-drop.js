#! /usr/bin/env node

require('dotenv').config()

const spaceManager = require('../../lib/contentful-space-manager')
const env = require('../../lib/env')

exports.command = 'aux:drop <name>'

exports.desc = 'Drops the environment with the given name.'

exports.builder = (yargs) => {
    yargs.positional('name', {
        describe: 'Name of the environment to be deleted.',
        type: 'string',
    })
}

exports.handler = async ({ name }) => {
    try {
        if (name === 'master') {
            console.error('Dropping master environment is not allowed.')
            return
        }

        const space = await spaceManager(env('CTF_SPACE'), name, env('CTF_CMA_TOKEN'))

        await space.deleteSpaceEnv(name)
        console.info(`${name} environment deleted in contentful.`)
    } catch (e) {
        console.error(e)
        process.exitCode = 1
    }
}
