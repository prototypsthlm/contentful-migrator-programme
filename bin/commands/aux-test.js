#! /usr/bin/env node

import dotenv from 'dotenv'
import { create, drop } from '../../src/migrator.js'
import { utcTimestamp } from '../../lib/date.js'
import log from '../../lib/log.js'

export const command = 'aux:test'

export const desc = 'Creates a temporary environment based on CTF_ENVIRONMENT_ID, applies any pending migration, and then is immediately deleted.'

export const handler = async () => {
    try {
        const testEnv = 'test' + utcTimestamp()
        await create({ newEnvId: testEnv })
        await drop({ envId: testEnv })
        log.info(`${testEnv} environment deleted in contentful.`)
    } catch (e) {
        log.error(e)
        process.exitCode = 1
    }
}
