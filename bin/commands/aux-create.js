#!/usr/bin/env node
import dotenv from 'dotenv';
import { create } from '../../src/migrator.js';
import { utcTimestamp } from '../../lib/date.js';
import log from '../../lib/log.js';

export const command = 'aux:create [name]';

export const desc = 'Creates an auxiliary environment based on CTF_ENVIRONMENT_ID and applies newer migrations to it.';

export const builder = (yargs) => {
    yargs.positional('name', {
        describe: 'Specify an optional name for the auxiliary environment.',
        type: 'string',
        default: 'test' + utcTimestamp(),
    });
};

export const handler = async ({ name }) => {
    try {
        await create({ newEnvId: name });
    } catch (e) {
        log.error('Something went wrong.', e);
    }
};
