const {setupInterceptorServer} = require("../traffic/interceptor");
const {setupMockedContentfulApi} = require("../mocks/contentful");

//setupInterceptorServer() //todo: only for testing
//setupMockedContentfulApi() //todo only for testing

require('yargs')
    .usage('Contentful migration tooling.')
    .commandDir('commands')
    .recommendCommands()
    .demandCommand(1, 'Have a look at the commands above and pick one.')
    .argv
