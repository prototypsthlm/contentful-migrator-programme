#! /usr/bin/env node

import * as dotenv from 'dotenv'
import spaceModule from '../../lib/contentful-space-manager'
import env from '../../lib/env'
import * as log from '../../lib/log'

dotenv.config()

export const command = 'reset'

export const desc = 'Resets current CTF_ENVIRONMENT_ID to master.'

export const handler = async () => {
  try {
    if (env('CTF_ENVIRONMENT_ID') === 'master') {
      log.error("Can't reset environment if you are on master.")
      return
    }

    const space = await spaceModule(
      env('CTF_SPACE_ID'),
      env('CTF_ENVIRONMENT_ID'),
      env('CTF_CMA_TOKEN')
    )

    log.info(`Deleting ${env('CTF_ENVIRONMENT_ID')} environment.`)
    await space.deleteSpaceEnv(env('CTF_ENVIRONMENT_ID'))
    log.success(`Deleted ${env('CTF_ENVIRONMENT_ID')} environment.`)

    log.info(`Creating ${env('CTF_ENVIRONMENT_ID')} environment cloning from master.`)
    await space.createSpaceEnv(env('CTF_ENVIRONMENT_ID'), 'master')
    log.success(`Created ${env('CTF_ENVIRONMENT_ID')} environment.`)

    log.info('Updating API key to work with the recreated env')
    await space.updateApiKeysAccessToNewEnv(env('CTF_ENVIRONMENT_ID'))
    log.success('Updated API key to work with the recreated env')
  } catch (e) {
    log.error(e)
    process.exitCode = 1
  }
}
