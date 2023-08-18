const { handler: resetCommand } = require('../bin/commands/reset')
const { setupMockedContentfulApi, closeMockedContentfulApi } = require('../mocks/contentful/baseContentfulHandler')
const { listNoAppliedMigrationHandler } = require('../mocks/contentful/handlers/list/noAppliedMigrationsHandler')

describe('reset', () => {
    it('should not reset environment if on master', async () => {
        setupMockedContentfulApi()

        let result = await resetCommand({ force: false })
        expect(result).toBe(`Can't reset environment if you are on master.`)
        closeMockedContentfulApi()
    })
})
