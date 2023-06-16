const {setupMockedContentfulApi} = require("../mocks/contentful");
const {handler: listCommand} = require("../bin/commands/list");
const {extractLogLinesFromConsole} = require("../__test-utils__/log");
const {defaultHandler} = require("../mocks/handlers/generic/genericResponseHandler");

describe('list', () => {
    setupMockedContentfulApi(defaultHandler)

    it('should log that no migrations are applied', async () => {
        const stdout = extractLogLinesFromConsole();
        await listCommand()
        expect(stdout).toContain("Found no applied migrations")
    });


/*    it('should log that migrations are applied', async () => {
        await createSimpleMigrationFile()
        await apply()
        let {stdout}  = await execa('./bin/cmp.js', ['list'])
        expect(stdout).toMatch('Applied migrations:')

        //todo: teardown / rollback migration
        /!*await apply({rollback: true} )
        stdout  = await execa('./bin/cmp.js', ['list'])
        expect(stdout).toMatch('Found no applied migrations')*!/
    });*/
})

