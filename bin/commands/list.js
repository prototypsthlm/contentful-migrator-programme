#! /usr/bin/env node

require('dotenv').config()
const { list } = require('../../src/migrator')
const env = require('../../lib/env')
const spaceModule = require('../../lib/contentful-space-manager')
const log = require('../../lib/log')

exports.command = 'list'

exports.desc = 'List applied migrations'

exports.builder = (_) => {}

exports.handler = async () => {
    try {
        const space = await spaceModule(env('CTF_SPACE_ID'), env('CTF_ENVIRONMENT_ID'), env('CTF_CMA_TOKEN'))
        const appliedMigrations = await list(space)
        appliedMigrations.sort((a, b) => b.timestamp.localeCompare(a.timestamp))
        if (appliedMigrations.length) {
            log.info('Applied migrations:')
            console.group()
            appliedMigrations.forEach((m) => {
                log.info(m)
            })
            console.groupEnd()
        } else {
            log.info('Found no applied migrations')
        }
    } catch (e) {
        log.error(e)
        process.exitCode = 1
    }
}
