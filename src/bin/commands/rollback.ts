#! /usr/bin/env node

import * as dotenv from 'dotenv'
import cliSelect from 'cli-select'
import { apply, list } from '../../migrator'
import env from '../../lib/env'
import spaceModule from '../../lib/contentful-space-manager'

dotenv.config()

export const command = 'rollback'

export const desc = 'Rollback already applied migrations'

export const builder = (yargs) => {
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

const runInteractive = async () => {
  const space = await spaceModule(
    env('CTF_SPACE_ID'),
    env('CTF_ENVIRONMENT_ID'),
    env('CTF_CMA_TOKEN')
  )
  const appliedMigrations = await list(space)
  if (!appliedMigrations.length) {
    console.log('Found no applied migrations')
    return
  }

  appliedMigrations.sort((a, b) => b.timestamp.localeCompare(a.timestamp))
  const menuItems = appliedMigrations.map((m) => `${m.timestamp} - ${m.name}`)

  cliSelect({ values: menuItems }).then((res) => {
    if (res.value) {
      return apply({
        rollback: true,
        targetMigrationTimestamp: appliedMigrations[res.id].timestamp,
      })
    }
    return null
  })
}

export const handler = async ({ force, interactive }) => {
  try {
    if (env('CTF_ENVIRONMENT_ID') === 'master' && !force) {
      console.error('Executing migrations against master requires the --force flag.')
      return
    }

    if (interactive) {
      await runInteractive()
    }

    await apply({ rollback: true })
  } catch (e) {
    console.error(e)
    process.exitCode = 1
  }
}
