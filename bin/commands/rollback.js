#! /usr/bin/env node

require('dotenv').config()
const { apply, list } = require('../../src/migrator')
const env = require('../../lib/env')
const cliSelect = require('cli-select')
const spaceModule = require('../../lib/contentful-space-manager')

exports.command = 'rollback'

exports.desc = 'Rollback already applied migrations'

exports.builder = (yargs) => {
    yargs.option('force', {
        alias: 'f',
        describe: 'Required to run them against master environment.',
        type: 'boolean',
    })

    yargs.option('interactive', {
        alias: 'i',
        describe: 'Presents a list of migrations to choose from',
        type: 'boolean',
    })
}

exports.handler = async ({ force, interactive }) => {
    try {
        if (env('CTF_ENVIRONMENT_ID') === 'master' && !force) {
            console.error('Executing migrations against master requires the --force flag.')
            return
        }

        if (interactive) {
            return await runInteractive()
        }

        await apply({ rollback: true })
    } catch (e) {
        console.error(e)
        process.exitCode = 1
    }
}

const runInteractive = async () => {
    const space = await spaceModule(env('CTF_SPACE'), env('CTF_ENVIRONMENT'), env('CTF_CMA_TOKEN'))
    const appliedMigrations = await list(space)
    if (!appliedMigrations.length) {
        console.log('Found no applied migrations')
        return
    }

    appliedMigrations.sort((a, b) => b.timestamp.localeCompare(a.timestamp))
    const menuItems = appliedMigrations.map((m) => `${m.timestamp} - ${m.name}`)

    return await cliSelect({ values: menuItems }).then((res) => {
        if (res.value) {
            return apply({ rollback: true, targetMigrationTimestamp: appliedMigrations[res.id].timestamp })
        }
    })
}
