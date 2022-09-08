#!/usr/bin/env node

// eslint-disable-next-line no-unused-expressions
require('yargs')
  .usage('Contentful migration tooling.')
  .commandDir('commands')
  .recommendCommands()
  .demandCommand(1, 'Have a look at the commands above and pick one.').argv
