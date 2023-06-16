const { execaNode
} = require("execa");
const {handler: migrateCommand} = require("../bin/commands/migrate");
const {extractLogLinesFromConsole} = require("../__test-utils__/log");
const {setupMockedContentfulApi} = require("../mocks/contentful");
const {defaultHandler} = require("../mocks/handlers/generic/genericResponseHandler");

describe('migrate', () => {
    setupMockedContentfulApi(defaultHandler)

    it('should demand user to use "--force" flag if running against master space', async () => {
        const stdout = extractLogLinesFromConsole();
        await migrateCommand(false)
        expect(stdout).toContain("Executing migrations against master requires the --force flag.")
        console.log(stdout)
    })

    //todo: implement
/*    it('apply migrations when supplying the --force flag', async () => {
        process.env.CTF_ENVIRONMENT_ID = 'master'
        const { stdout } = await execaNode('./bin/cmp.js', ['migrate --force'])
        //expect(stdout).toMatch('Executing migrations against master requires the --force flag.')
    })*/
})
