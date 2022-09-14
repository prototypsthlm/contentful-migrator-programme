#! /usr/bin/env node

import * as dotenv from 'dotenv'
import * as log from '../../lib/log'
import { create } from '../../migrator'
import { utcTimestamp } from '../../lib/date'

dotenv.config()

export const command = 'aux:create [name]'

export const desc =
  'Creates an auxiliary environment based on CTF_ENVIRONMENT_ID and applies newer migrations to it.'

export const builder = (yargs) => {
  yargs.positional('name', {
    describe: 'Specify an optional name for the auxiliary environment.',
    type: 'string',
    default: `test${utcTimestamp()}`,
  })
}

export const handler = async ({ name }) => {
  try {
    await create({ newEnvId: name })
  } catch (e) {
    log.error('Something went wrong.', e)
  }
}
