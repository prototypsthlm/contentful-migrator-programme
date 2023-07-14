const { handler: migrateCommand } = require('../bin/commands/migrate')
const { extractLogLinesFromConsole } = require('../__test-utils__/log')
const { setupMockedContentfulApi, closeMockedContentfulApi } = require('../mocks/contentful/baseContentfulHandler')
const { createSimpleMigrationFile } = require('../__test-utils__/create-migration')
const { applyOneMigrationHandler } = require('../mocks/contentful/handlers/migrate/applyOneMigrationHandler')

describe('migrate', () => {
    /*    it('should demand user to use "--force" flag if running against master space', async () => {
        const stdout = extractLogLinesFromConsole()
        await migrateCommand({force: false})
        expect(stdout).toContain("Executing migrations against master requires the --force flag.")
    })*/

    /*    it('should log that no migrations to apply if migrations directory is empty', async () => {
        setupMockedContentfulApi(applyOneMigrationHandler)
        const stdout = extractLogLinesFromConsole()

        await migrateCommand({force: true})
        expect(stdout).toContain("No migrations to apply.")

        closeMockedContentfulApi()
    })*/

    it('should initially create a table for Applied Migrations', async () => {
        //todo: this test will actually perform 2 migrations:
        //todo: 1 for applied migrations table
        //:todo 1 for test content type

        setupMockedContentfulApi(applyOneMigrationHandler)
        const stdout = extractLogLinesFromConsole()

        createSimpleMigrationFile()
        await migrateCommand({ force: true })
        //The following migration has been planned
        //Publish Content Type appliedMigrations
        expect(stdout).toContain('`Applied migrations` type not found. Creating it.')
        //expect(stdout).toContain('About to apply the following migrations:')
        //expect(stdout).toContain("🎉  Migration successful")

        closeMockedContentfulApi()
    })
})
