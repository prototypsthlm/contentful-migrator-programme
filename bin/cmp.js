#!/usr/bin/env node

require('yargs')
    .usage(
        'Contentful migration tooling.'
    )
    .commandDir('./commands')
    .recommendCommands()
    .demandCommand(1, 'Please provide a valid command from the list above').argv
