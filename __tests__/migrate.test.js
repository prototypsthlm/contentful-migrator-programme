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

    it('should migrate if force flag is true', async () => {
        setupMockedContentfulApi(applyOneMigrationHandler)
        const stdout = extractLogLinesFromConsole()

        createSimpleMigrationFile()
        await migrateCommand({ force: true })

        expect(stdout).toContain('About to apply the following migrations:')
        //expect(stdout).toContain("🎉  Migration successful")

        closeMockedContentfulApi()
    })
})

/*
    About to apply the following migrations:
    20230609122547608 - new-migration

    Creating environment 2023-06-28-11-35-08.
    Environment 2023-06-28-11-35-08 created.
    Updating api key access to new env 2023-06-28-11-35-08.

    Api key access to new env 2023-06-28-11-35-08 updated.

    Migrating.

    The following migration has been planned

Environment: 2023-06-28-11-35-08

Create Content Type testContentType
- name: "Test content type"
- description: ""
- displayField: "testContentId"

Create field testContentId
- name: "test content id"
- type: "Symbol"

Publish Content Type testContentType
❯ Create Content Type testContentType
  ⠋ Making requests (1/2)
❯ Create Content Type testContentType
❯ Create Content Type testContentType
  ⠸ Making requests (2/2)
❯ Create Content Type testContentType
✔ Create Content Type testContentType
🎉  Migration successful

    Migrated.
        Switching environment alias.

    Environment alias switched successfully.
    handling exit

*/
