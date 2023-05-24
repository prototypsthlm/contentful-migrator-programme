#!/usr/bin/env node

import yargs from 'yargs/yargs';
import * as generateCommand from "./commands/generate.js";
import * as migrateCommand from "./commands/migrate.js";

yargs(process.argv.slice(2))
    .scriptName("cmp")
    .usage('Contentful migration tooling.')
    .command(generateCommand)
    .command(migrateCommand)
    .demandCommand(1, 'Have a look at the commands above and pick one.')
    .argv
