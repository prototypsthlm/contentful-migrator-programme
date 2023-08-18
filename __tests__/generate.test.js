const fs = require('fs')
const { join } = require('path')
const { handler: generateCommand } = require('../bin/commands/generate')

describe('generate', () => {
    it('should create a new migration file', async () => {
        //const stdout = extractLogLinesFromConsole()
        const migrationName = 'test-migration'
        let result = await generateCommand({ name: migrationName })

        let numberOfMigrationsInMigrationsDir = fs.readdirSync(process.env.MIGRATIONS_DIR).length
        expect(numberOfMigrationsInMigrationsDir).toBe(1)

        const migrationFileName = result.split(' ').find((m) => m.indexOf('js') > -1)
        const migrationFilePath = `${process.env.MIGRATIONS_DIR}/${migrationFileName}`
        const migrationFile = fs.readFileSync(migrationFilePath, 'utf-8')
        const template = fs.readFileSync(join(__dirname, '..', 'templates', 'migration.mustache'), 'utf8')
        expect(migrationFile).toEqual(template)
    })
})
