//overrides network calls to contentful for testing purposes
const {setupServer} = require('msw/node')
const log = require("../lib/log");
const {rest} = require("msw");
const {spacesResponseBody, localeResponseBody,
    masterEnvironmentResponseBody, appliedMigrationResponseBody, test
} = require("./responseBodys");

module.exports.setupMockedContentfulApi = () => {
    log.info("setting up mocked contentful rest server")
    const server = setupServer(...handlers)

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
const baseURL = 'https://api.contentful.com/spaces/bo6ijs14u5ox'

//todo: these handlers correspond to a migrate cmd
//todo: we need to be able to support different response types (migrated, non migrated etc)
const handlers = [
    //spaces
    rest.get(`${baseURL}`, (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json(spacesResponseBody),
        )
    }),

    //prev query params
    //?content_type=appliedMigrations&limit=1000
    rest.get(`${baseURL}/environments/master/entries`, (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json(test),
        )
    }),

    rest.get(`${baseURL}/environments/master/content_types/appliedMigration`, (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json(appliedMigrationResponseBody),
        )
    }),


    rest.get(`${baseURL}/environments/master/content_types/appliedMigrations`, (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json(appliedMigrationResponseBody),
        )
    }),


    rest.get(`${baseURL}/environments/master`, (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json(masterEnvironmentResponseBody),
        )
    }),


    rest.get(`${baseURL}/environments/master/locales`, (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json(localeResponseBody),
        )
    }),


]