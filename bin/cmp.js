#!/usr/bin/env node

require('yargs')
    .usage('Contentful migration tooling.')
    .commandDir('./commands')
    .recommendCommands()
    .demandCommand().argv
