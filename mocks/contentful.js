//overrides network calls to contentful for testing purposes
const {setupServer} = require('msw/node')
const log = require("../lib/log");
const {rest} = require("msw");
const {spacesResponseBody, localeResponseBody,
    masterEnvironmentResponseBody, appliedMigrationResponseBody, entiresResponseBody
} = require("./handlers/generic/responseBodys");

module.exports.setupMockedContentfulApi = (handlers) => {
    log.info("setting up mocked contentful rest server")
    const server = setupServer(...spacesAuthHandler, ...localeHandler, ...handlers)

    //log unhandled requests
    server.listen({
        onUnhandledRequest(req) {
            log.warn(
                `* Found an unhandled ${req.method} request to ${req.url.href}`,
            )
        },
    })

    process.on('exit', () => {
        log.info("handling exit...")
    })

    server.events.on('request:start', (request, response) => {
        // Record every dispatched request.
        log.info(
            `* intercepting ${request.method} request to ${request.url}`,
        )
    })
}

//todo: use env vars for space id
module.exports.baseURL = 'https://api.contentful.com/spaces/bo6ijs14u5ox'


//todo: we need to be able to support different response types (migrated, non migrated etc)
const spacesAuthHandler = [
    rest.get(`${this.baseURL}`, (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json(spacesResponseBody),
        )
    }),
]

const localeHandler = [
    rest.get(`${this.baseURL}/environments/master/locales`, (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json(localeResponseBody),
        )
    }),
]
