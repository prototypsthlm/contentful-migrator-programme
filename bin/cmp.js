#!/usr/bin/env node

const { setupInterceptorServer } = require('../traffic/interceptor')
setupInterceptorServer({ logUnhandledRequests: true })

require('yargs')
    .usage('Contentful migration tooling.')
    .commandDir('commands')
    .recommendCommands()
    .demandCommand(1, 'Have a look at the commands above and pick one.').argv
