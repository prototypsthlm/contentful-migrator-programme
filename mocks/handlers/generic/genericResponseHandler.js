

const {rest} = require("msw");
const {entiresResponseBody, appliedMigrationResponseBody, masterEnvironmentResponseBody} = require("./responseBodys");
const {baseURL} = require("../../contentful");

//todo: map to specific command, these values where taken from the migrate command
//todo: refactor all handlers based on command instead and pass as param
module.exports.defaultHandler = [
    rest.get(`${baseURL}/environments/master/entries`, (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json(entiresResponseBody),
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
]