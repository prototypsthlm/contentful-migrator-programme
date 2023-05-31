import execa from "execa";
//const env = require("../lib/env.js");
import env from '../lib/env.js'
import log from "../lib/log.js"
describe('list', () => {
    it('should log that no migrations are applied', async () => {
        const { stdout } = await execa.node('./bin/cmp.js', ['list'])
        expect(stdout).toMatch('Found no applied migrations')
    })
})
