#!/usr/bin/env node

//todo: remove, only for testing
const { setupInterceptorServer } = require('../traffic/interceptor')
setupInterceptorServer({ logUnhandledRequests: true, logBypassedTraffic: true, saveTrafficToFile: true })

require('yargs')
    .usage('Contentful migration tooling.')
    .commandDir('commands')
    .recommendCommands()
    .demandCommand(1, 'Have a look at the commands above and pick one.').argv
