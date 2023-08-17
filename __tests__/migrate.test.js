const { handler: migrateCommand } = require('../bin/commands/migrate')
const { extractLogLinesFromConsole } = require('../__test-utils__/log')
const { setupMockedContentfulApi, closeMockedContentfulApi } = require('../mocks/contentful/baseContentfulHandler')

describe('migrate', () => {
    it('should demand user to use "--force" flag if running against master space', async () => {
        setupMockedContentfulApi() //is this necessary?
        const stdout = extractLogLinesFromConsole()
        await migrateCommand(false)
        expect(stdout).toContain('Executing migrations against master requires the --force flag.')
        closeMockedContentfulApi()
    })
})
