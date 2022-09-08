#! /usr/bin/env node

require('dotenv').config()
const { create } = require('../../src/migrator')
const { utcTimestamp } = require('../../lib/date')
const log = require('../../lib/log')

exports.command = 'aux:create [name]'

exports.desc =
  'Creates an auxiliary environment based on CTF_ENVIRONMENT_ID and applies newer migrations to it.'

exports.builder = (yargs) => {
  yargs.positional('name', {
    describe: 'Specify an optional name for the auxiliary environment.',
    type: 'string',
    default: `test${utcTimestamp()}`,
  })
}

exports.handler = async ({ name }) => {
  try {
    await create({ newEnvId: name })
  } catch (e) {
    log.error('Something went wrong.', e)
  }
}
