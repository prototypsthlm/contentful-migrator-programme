const { setupMockedContentfulApi, closeMockedContentfulApi } = require('../mocks/contentful/baseContentfulHandler')
const { handler: listCommand } = require('../bin/commands/list')
const { listOneMigrationAppliedHandler } = require('../mocks/contentful/handlers/list/oneAppliedMigrationsHandler')
const { listNoAppliedMigrationHandler } = require('../mocks/contentful/handlers/list/noAppliedMigrationsHandler')
const { createSimpleMigrationFile } = require('../__test-utils__/create-migration')
const { readdirSync } = require('fs')

describe('list', () => {
    it('should log that no migrations are applied', async () => {
        setupMockedContentfulApi(listNoAppliedMigrationHandler)
        let numberOfMigrationsInMigrationsDir = readdirSync(process.env.MIGRATIONS_DIR).length
        expect(numberOfMigrationsInMigrationsDir).toBe(0)

        let result = await listCommand()
        expect(result).toBe('Found no applied migrations')
        closeMockedContentfulApi()
    })

    it('should log that migrations are applied', async () => {
        setupMockedContentfulApi(listOneMigrationAppliedHandler)

        createSimpleMigrationFile()
        let numberOfMigrationsInMigrationsDir = readdirSync(process.env.MIGRATIONS_DIR).length
        expect(numberOfMigrationsInMigrationsDir).toBe(1)

        //todo: fix
        let result = await listCommand()
        expect(result).toBe('Applied migrations:\n  20230609122547608 - new-migration')
        /*expect(stdout).toContain('Applied migrations:')
        expect(stdout).toContain('20230609122547608 - new-migration')*/
        closeMockedContentfulApi()
    })
})
