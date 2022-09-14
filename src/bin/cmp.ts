#!/usr/bin/env node

import * as yargs from 'yargs'

// eslint-disable-next-line no-unused-expressions
yargs
  .usage('Contentful migration tooling.')
  .commandDir('commands')
  .recommendCommands()
  .demandCommand(1, 'Have a look at the commands above and pick one.').argv
