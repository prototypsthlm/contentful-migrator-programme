#! /usr/bin/env node

import * as dotenv from 'dotenv'
import { list } from '../../migrator'
import env from '../../lib/env'
import spaceModule from '../../lib/contentful-space-manager'
import * as log from '../../lib/log'

dotenv.config()

export const command = 'list'

export const desc = 'List applied migrations'

export const handler = async () => {
  try {
    const space = await spaceModule(
      env('CTF_SPACE_ID'),
      env('CTF_ENVIRONMENT_ID'),
      env('CTF_CMA_TOKEN')
    )
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
