import dotenv from 'dotenv'
dotenv.config()

import * as fs from "fs"
import { join } from 'path'
import { utcTimestamp } from '../lib/date.js'
import spaceModule from '../lib/contentful-space-manager.js'
import env from '../lib/env.js'
import serialize from 'serialize-javascript'
import tmp from 'tmp'
import { updateBookkeeping,
    initBookkeeping,
    getMigrationTimestampsForBatch,
    getLatestBatchNumber,
    getMigratedTimestamps,} from './bookkeeping.js'
import chalk from "chalk"
import log from '../lib/log.js'
//todo: The "id" argument must be of type string? because of broken migration file?
import { runMigration as ctfRunMigrations} from 'contentful-migration/built/bin/cli.js'
//import {migration} from "../migrations/20230602075003097-inititial-migration.cjs";
//import {runMigration as ctfRunMigrations} from '../node_modules/contentful-migration/built/bin/cli.js'

const MIGRATIONS_DIR = join(process.cwd(), env('MIGRATIONS_DIR'))
const MAX_NUMBER_OF_ENVIRONMENTS = parseInt(env('MAX_NUMBER_OF_ENVIRONMENTS'))
const MAX_NUMBER_OF_ALIASES = parseInt(env('MAX_NUMBER_OF_ALIASES'))

/**
 * Gets the timestamp from a filename such as '20200211111800525-create-cars-type.js'
 *
 * @param {string} filename
 * @returns {string|null} the timestamp if matched, null otherwise
 */
const getTimestampFromFileName = (filename) => {
    const matches = filename.match(/(^\d{17})-/)
    return (matches && matches[1]) || null
}

const getNameFromFileName = (filename) => {
    const matches = filename.match(/^\d{17}-([^.]+)/)
    return (matches && matches[1]) || null
}

const getMigrationsToHandle = async (space, options = {}) => {
    //todo: might fail here?
    // Take only `19990101235959111-migration-name.js` files
    const allMigrations = fs.readdirSync(MIGRATIONS_DIR).filter((file) => /^\d{17}.*\.cjs$/.test(file))
    log.info("allMigrations: " + allMigrations.length)
    log.info("allMigrations: " + JSON.stringify(allMigrations[0], null, 2))
    // Rolling back
    if (options.rollback) {
        if (options.targetMigrationTimestamp) {
            return (await getAppliedMigrations(space))
                .filter((m) => Number(m.timestamp) > Number(options.targetMigrationTimestamp))
                .map((m) => getDownMigration(m.fileName))
        }

        const latestBatchNumber = await getLatestBatchNumber(space)
        let latestBatchMigrationTimestamps = await getMigrationTimestampsForBatch(space, latestBatchNumber)
        let fullMigrationsToRun = allMigrations.filter((file) => {
            const timestamp = getTimestampFromFileName(file)
            return timestamp && latestBatchMigrationTimestamps.includes(timestamp)
        })
        log.info("END")
        log.info("fullMigrationsToRun: " + fullMigrationsToRun.length)
        log.info("fullMigrationsToRun: " + JSON.stringify(fullMigrationsToRun[0], null, 2))
        let getDownRes = await getDownMigration
        log.info("getDownMigration: ", getDownRes)
        return fullMigrationsToRun.map(await getDownMigration)
    }

    // Rolling forward
    const appliedMigrationTimestamps = await getMigratedTimestamps(space)
    let fullMigrationsToRun = allMigrations.filter((file) => {
        const timestamp = getTimestampFromFileName(file)
        return timestamp && !appliedMigrationTimestamps.includes(timestamp)
    })

    return fullMigrationsToRun.map(getUpMigration)
}

export const getAppliedMigrations = async (space) => {
    log.info("getAppliedMigrations from space: " + space.spaceId)
    const migratedTimestamps = await getMigratedTimestamps(space)
    return fs
        .readdirSync(MIGRATIONS_DIR)
        .filter((file) => {
            const timestamp = getTimestampFromFileName(file)
            return timestamp && migratedTimestamps.includes(timestamp)
        })
        .map((file) => new Migration(file, getTimestampFromFileName(file), getNameFromFileName(file)))
}

const getUpMigration = async(migrationFunction) => await extractFunctionToSeparateFile(migrationFunction, 'up')

const getDownMigration = async(migrationFunction) => await extractFunctionToSeparateFile(migrationFunction, 'down')

const extractFunctionToSeparateFile = async (filePath, direction) => {
    //needs to be dynamic import, the below row used require before
    //const {up, down} = await import(join(MIGRATIONS_DIR, filePath))
    log.info("filepath: ", join(MIGRATIONS_DIR, filePath))
    //const {migration} = require(join(MIGRATIONS_DIR, filePath))
    let path = join(MIGRATIONS_DIR, filePath)
    const temp = await import(path)
    log.info("********")
    log.info(JSON.stringify(temp.default, null, 2))
    log.info("********")
    //migration.test()
    log.info("imported migration: ", JSON.stringify(temp, null, 2))
    //const upAndDownFunctions = from 'upAndDownFunctionsDir'
    /*up()
    down()*/

    if (!(temp.up && temp.down)) {
        throw new Error("Each migration module needs to declare both 'up' and 'down' functions")
    }
    //todo: support both functions
    const serializedFunction = `module.exports = ${serialize(temp[direction])}`
    const partialMigrationFile = tmp.fileSync({ prefix: `up-${filePath}`, postfix: '.js' })
    log.info("partialMigrationFile: " + JSON.stringify(partialMigrationFile, null, 2))
    fs.writeFileSync(partialMigrationFile.name, serializedFunction)

    return new Migration(partialMigrationFile.name, getTimestampFromFileName(filePath), getNameFromFileName(filePath))
}

export const runMigrations = async (migrations, envId) => {
    log.info(`Running ${migrations.length} migrations...`)
    for (const migration of migrations) {
        log.info(`Running migration in loop: ${JSON.stringify(migration, null,2)}`)
        await ctfRunMigrations({
            filePath: migration.fileName,
            spaceId: env('CTF_SPACE_ID'),
            accessToken: env('CTF_CMA_TOKEN'),
            environmentId: envId,
            yes: true,
        })
    }
}

class Migration {
    constructor(fileName, timestamp, name) {
        this.fileName = fileName
        this.timestamp = timestamp
        this.name = name
    }

    toString = () => `${this.timestamp} - ${this.name}`
}

const migrate = async (space, options = {}) => {
    log.info("Migrating....")
    await initBookkeeping(space)

    const migrationsToApply = await getMigrationsToHandle(space, options)
    log.info("migrationToApply: " + JSON.stringify(migrationsToApply, null, 2))

    if (!migrationsToApply.length) {
        log.info(`No migrations to ${options.rollback ? 'rollback' : 'apply'}.`)
        return
    }

    log.info(options.rollback ? 'Rolling back.' : 'Migrating.')
    await runMigrations(migrationsToApply, space.env.sys.id)
    await updateBookkeeping(space, migrationsToApply, options)
    log.info(options.rollback ? 'Rolled back.' : 'Migrated.')
}

const delay = (time) => new Promise((resolve) => setTimeout(resolve, time))

const tryGetEnv = async (envId, retries, waitingMilliseconds) => {
    try {
        return await spaceModule(env('CTF_SPACE_ID'), envId, env('CTF_CMA_TOKEN'))
    } catch (e) {
        if (retries > 0) {
            log.warn(`Env not ready yet.`)
            log.warn(`Waiting ${waitingMilliseconds} ms and retrying.`)
            await delay(waitingMilliseconds)
            return await tryGetEnv(envId, retries - 1, waitingMilliseconds)
        }
        throw e
    }
}

const createEnv = async (space, envId) => {
    log.info(`Creating environment ${envId}.`)
    await space.createSpaceEnv(envId, env('CTF_ENVIRONMENT_ID'))
    log.success(`Environment ${envId} created.`)

    log.info(`Updating api key access to new env ${envId}.`)
    await space.updateApiKeysAccessToNewEnv(envId)
    log.success(`Api key access to new env ${envId} updated.`)

    return await tryGetEnv(envId, env('NUMBER_OF_RETRIES_WHEN_CREATING_ENVIRONMENT'), 1000)
}

const switchEnvAliasAndDropOldEnv = async (space, auxEnv) => {
    log.info('Switching environment alias.')
    const currentEnv = await space.getCurrentEnvironmentOfAlias(env('CTF_ENVIRONMENT_ID'))
    await space.switchEnvOfAlias(env('CTF_ENVIRONMENT_ID'), auxEnv)
    await space.deleteSpaceEnv(currentEnv.sys.id)
    log.info('Environment alias switched successfully.')
}

const failIfNoAvailableEnvironments = async (space) => {
    const envs = await space.getEnvironments()
    if (envs.items.length >= MAX_NUMBER_OF_ENVIRONMENTS + MAX_NUMBER_OF_ALIASES) {
        throw Error('Maximum environment amount reached. Aborting.')
    }
}

export const apply = async (options = {}) => {
    const space = await spaceModule(env('CTF_SPACE_ID'), env('CTF_ENVIRONMENT_ID'), env('CTF_CMA_TOKEN'))

    await initBookkeeping(space)
    log.info("bookeeping done")

    const migrationsToHandle = await getMigrationsToHandle(space, options)

    if (!migrationsToHandle.length) {
        log.info(`No migrations to ${options.rollback ? 'rollback' : 'apply'}.`)
        return
    }

    if (options.rollback) {
        log.info('About to rollback the following migrations:\n  ' + migrationsToHandle.join('\n  '))
    } else {
        log.info('About to apply the following migrations:\n  ' + migrationsToHandle.join('\n  '))
    }

    if (env('CTF_ENVIRONMENT_ID') === 'master') {
        log.info("runnig towards master env")
        const newEnvId = utcTimestamp({ dashes: true })

        try {
            await failIfNoAvailableEnvironments(space)
            log.info("env available")
            const spaceNewEnv = await createEnv(space, newEnvId)
            log.info("beginning migration....")
            await migrate(spaceNewEnv, options)
            await switchEnvAliasAndDropOldEnv(space, newEnvId)
            return
        } catch (e) {
            await space.deleteSpaceEnv(newEnvId)
            throw e
        }
    }

    await migrate(space, options)
}

export const create = async ({ newEnvId }) => {
    const space = await spaceModule(env('CTF_SPACE_ID'), env('CTF_ENVIRONMENT_ID'), env('CTF_CMA_TOKEN'))

    if (await space.environmentExists(newEnvId)) {
        log.error(`An environment with id ${newEnvId} already exists.`)
        return
    }

    await failIfNoAvailableEnvironments(space)

    try {
        const spaceNewEnv = await createEnv(space, newEnvId)

        await migrate(spaceNewEnv)

        console.group()
        log.success('###########################################')
        log.success(`Contentful test environment \`${chalk.blue(newEnvId)}\` created`)
        log.success('###########################################')
        console.groupEnd()

        console.group()
        log.warn('Configure that into your local "CTF_ENVIRONMENT_ID" to test out')
        log.warn(`And remember to delete it after with: "cmp aux:drop ${newEnvId}"`)
        console.groupEnd()
    } catch (e) {
        await space.deleteSpaceEnv(newEnvId)
        throw e
    }
}

export const drop = async ({ envId }) => {
    const space = await spaceModule(env('CTF_SPACE_ID'), envId, env('CTF_CMA_TOKEN'))
    await space.deleteSpaceEnv(envId)
}
