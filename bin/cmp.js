#!/usr/bin/env node
import yargs from 'yargs'
import {builder, command, desc, handler} from "./commands/generate.js";

const yarg = yargs()

yarg.usage('Contentful migration tooling.')
    .command(command, desc, builder
        , handler)
    .recommendCommands()
    .demandCommand(1, 'Have a look at the commands above and pick one.')
    .argv
/*

yarg.usage('Contentful migration tooling.')
    //.commandDir('commands')
    .command('commands/aux-drop')
    .recommendCommands()
    .demandCommand(1, 'Have a look at the commands above and pick one.')
    .argv

yarg.usage('Contentful migration tooling.')
    //.commandDir('commands')
    .command('commands/aux-test')
    .recommendCommands()
    .demandCommand(1, 'Have a look at the commands above and pick one.')
    .argv

yarg.usage('Contentful migration tooling.')
    //.commandDir('commands')
    .command('commands/generate')
    .recommendCommands()
    .demandCommand(1, 'Have a look at the commands above and pick one.')
    .argv

yarg.usage('Contentful migration tooling.')
    //.commandDir('commands')
    .command('commands/list')

    .recommendCommands()
    .demandCommand(1, 'Have a look at the commands above and pick one.')
    .argv

yarg.usage('Contentful migration tooling.')
    //.commandDir('commands')
    .command('commands/migrate')
    .recommendCommands()
    .demandCommand(1, 'Have a look at the commands above and pick one.')
    .argv

yarg.usage('Contentful migration tooling.')
    //.commandDir('commands')
    .command('commands/reset')
    .recommendCommands()
    .demandCommand(1, 'Have a look at the commands above and pick one.')
    .argv

yarg.usage('Contentful migration tooling.')
    //.commandDir('commands')
    .command('commands/rollback')
    .recommendCommands()
    .demandCommand(1, 'Have a look at the commands above and pick one.')
    .argv*/
