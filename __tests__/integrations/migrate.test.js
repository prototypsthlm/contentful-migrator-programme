const { handler: migrateCommand } = require('../../bin/commands/migrate')
const { handler: rollbackCommand } = require('../../bin/commands/rollback')
const { createSimpleMigrationFile } = require('../../__test-utils__/create-migration')

afterEach(async () => {
    //unapply the migration done by the tests
    await rollbackCommand({ force: true })
})

describe('migrate', () => {
    test('migrate if the force flag is used against master', async () => {
        createSimpleMigrationFile()

        let result = await migrateCommand({ force: true })

        expect(result).toBe('Applied the following migrations:\n  20230609122547608 - new-migration')
    }, 100000)

    test('log if there are no migrations to apply', async () => {
        let result = await migrateCommand({ force: true })
        expect(result).toBe('No migrations to apply.')
    }, 100000)
})
