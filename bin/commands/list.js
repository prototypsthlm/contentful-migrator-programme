#! /usr/bin/env node

require('dotenv').config()
const { list } = require('../../src/migrator')
const env = require('../../lib/env')
const spaceModule = require('../../lib/contentful-space-manager')

exports.command = 'list'

exports.desc = 'List applied migrations'

exports.builder = (_) => {}

exports.handler = async () => {
    try {
        const space = await spaceModule(env('CTF_SPACE'), env('CTF_ENVIRONMENT'), env('CTF_CMA_TOKEN'))
        const appliedMigrations = await list(space)
        appliedMigrations.sort((a, b) => b.timestamp.localeCompare(a.timestamp))
        if (appliedMigrations.length) {
            console.log('Applied migrations:')
            appliedMigrations.forEach((m) => {
                console.log(`  ${m.timestamp} - ${m.name}`)
            })
        } else {
            console.log('Found no applied migrations')
        }
    } catch (e) {
        console.error(e)
        process.exitCode = 1
    }
}
