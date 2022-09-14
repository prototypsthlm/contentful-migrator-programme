#! /usr/bin/env node

import * as dotenv from 'dotenv'
import { apply } from '../../migrator'
import env from '../../lib/env'
import * as log from '../../lib/log'

dotenv.config()

export const command = 'migrate'

export const desc = 'Apply migrations.'

export const builder = (yargs) => {
  yargs.option('force', {
    alias: 'f',
    describe: 'Required to run them against master environment.',
    type: 'boolean',
  })
}

export const handler = async ({ force }) => {
  try {
    if (env('CTF_ENVIRONMENT_ID') === 'master' && !force) {
      log.error('Executing migrations against master requires the --force flag.')
      return
    }

    await apply({ rollback: false })
  } catch (e) {
    log.error(e)
    process.exitCode = 1
  }
}
