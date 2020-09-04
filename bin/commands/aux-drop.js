#! /usr/bin/env node

require('dotenv').config()
const { drop } = require('../../src/migrator')
const log = require('../../lib/log')

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
            log.error('Dropping master environment is not allowed.')
            return
        }

        await drop({ envId: name })
        log.success(`${name} environment deleted in contentful.`)
    } catch (e) {
        log.error(e)
        process.exitCode = 1
    }
}
