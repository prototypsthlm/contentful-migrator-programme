#!/usr/bin/env node

import dotenv from 'dotenv'
import {getAppliedMigrations as list}  from '../../src/migrator.js'
import env from '../../lib/env.js'
import spaceModule from '../../lib/contentful-space-manager.js'
import log from '../../lib/log.js'

export const command = 'list'

export const desc = 'List applied migrations'

export const builder = (_) => {}

export const handler = async () => {
    try {
        const space = await spaceModule(env('CTF_SPACE_ID'), env('CTF_ENVIRONMENT_ID'), env('CTF_CMA_TOKEN'))
        log.info("space id: ", env('CTF_SPACE_ID'))
        log.info("space", JSON.stringify(space, null, 2))
        const appliedMigrations = await list(space)
        appliedMigrations.sort((a, b) => b.timestamp.localeCompare(a.timestamp))
        if (appliedMigrations.length) {
            log.info('Applied migrations:')
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
