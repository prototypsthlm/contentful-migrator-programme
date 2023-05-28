#!/usr/bin/env node

import yargs from 'yargs/yargs'
import * as auxCreate from "./commands/aux-create.js"
import * as auxDrop from "./commands/aux-drop.js"
import * as auxTest from "./commands/aux-test.js"
import * as generate from "./commands/generate.js"
import * as list from "./commands/list.js"
import * as migrate from "./commands/migrate.js"
import * as reset from "./commands/reset.js"
import * as rollback from "./commands/rollback.js"

yargs(process.argv.slice(2))
    .scriptName("cmp")
    .usage('Contentful migration tooling.')
    .command(auxCreate)
    .command(auxDrop)
    .command(auxTest)
    .command(generate)
    .command(list)
    .command(migrate)
    .command(reset)
    .command(rollback)
    .demandCommand(1, 'Have a look at the commands above and pick one.')
    .recommendCommands()
    .argv
