#! /usr/bin/env node

require('dotenv').config()

const spaceManager = require('../../lib/contentful-space-manager')

exports.command = 'aux:drop <name>'

exports.desc = 'Drops the given auxiliary environment.'

exports.builder = (yargs) => {
    yargs.positional('name', {
        describe: 'Name of the environment to be deleted.',
        type: 'string',
    })
}

exports.handler = async ({ name }) => {
    try {
        if (name === 'master') {
            throw new Error('Dropping master environment is not allowed.')
        }

        const space = await spaceManager(process.env.CTF_SPACE, name, process.env.CTF_CMA_TOKEN)

        await space.deleteSpaceEnv(name)
        console.info(`${name} environment deleted in contentful.`)
    } catch (e) {
        console.error(e)
        process.exitCode = 1
    }
}
