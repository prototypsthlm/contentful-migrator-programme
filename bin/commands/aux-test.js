#! /usr/bin/env node

require('dotenv').config()
const { create, drop } = require('../../src/migrator')
const { utcTimestamp } = require('../../lib/date')
const log = require('../../lib/log')

exports.command = 'aux:test'

exports.desc =
  'Creates a temporary environment based on CTF_ENVIRONMENT_ID, applies any pending migration and then is immediately deleted.'

exports.handler = async () => {
  try {
    const testEnv = `test${utcTimestamp()}`
    await create({ newEnvId: testEnv })
    await drop({ envId: testEnv })
    log.info(`${testEnv} environment deleted in contentful.`)
  } catch (e) {
    log.error(e)
    process.exitCode = 1
  }
}
