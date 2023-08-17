const { handler: resetCommand } = require('../bin/commands/reset')
const { extractLogLinesFromConsole } = require('../__test-utils__/log')
const { setupMockedContentfulApi, closeMockedContentfulApi } = require('../mocks/contentful/baseContentfulHandler')
const { listNoAppliedMigrationHandler } = require('../mocks/contentful/handlers/list/noAppliedMigrationsHandler')

describe('reset', () => {
    it('should not reset environment if on master', async () => {
        setupMockedContentfulApi()
        const stdout = extractLogLinesFromConsole()
        await resetCommand({ force: false })
        expect(stdout).toContain(`Can't reset environment if you are on master.`)
        closeMockedContentfulApi()
    })
})
