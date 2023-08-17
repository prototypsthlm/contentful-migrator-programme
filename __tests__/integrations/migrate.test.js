const { handler: migrateCommand } = require('../../bin/commands/migrate')
const { handler: rollbackCommand } = require('../../bin/commands/rollback')
const { extractLogLinesFromConsole, flushLogLines } = require('../../__test-utils__/log')
const { setupMockedContentfulApi, closeMockedContentfulApi } = require('../../mocks/contentful/baseContentfulHandler')
const { createSimpleMigrationFile } = require('../../__test-utils__/create-migration')

describe('migrate', () => {
    test('migrate if the force flag is used against master', async () => {
        const stdout = extractLogLinesFromConsole()

        createSimpleMigrationFile()

        await migrateCommand({ force: true })

        expect(stdout).toContain('Migrated.')

        //unapply the migration
        await rollbackCommand({ force: true })
        expect(stdout).toContain('Rolled back.')
    }, 100000)
})
