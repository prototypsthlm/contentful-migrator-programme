#! /usr/bin/env node

import * as dotenv from 'dotenv'
import { drop } from '../../migrator'
import * as log from '../../lib/log'

dotenv.config()

export const command = 'aux:drop <name>'

export const desc = 'Drops the environment with the given name.'

export const builder = (yargs) => {
  yargs.positional('name', {
    describe: 'Name of the environment to be deleted.',
    type: 'string',
  })
}

export const handler = async ({ name }) => {
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
