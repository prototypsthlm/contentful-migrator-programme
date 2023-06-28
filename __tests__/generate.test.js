const fs = require('fs')
const { join } = require('path')
const {handler: generateCommand} = require("../bin/commands/generate")
const {extractLogLinesFromConsole} = require("../__test-utils__/log")
const {readdirSync} = require("fs")

describe('generate', () => {
    it('should create a new migration file', async () => {
        const stdout = extractLogLinesFromConsole()
        const migrationName = 'test-migration'
        await generateCommand({name: migrationName})

        let numberOfMigrationsInMigrationsDir = readdirSync(process.env.MIGRATIONS_DIR)
        expect(numberOfMigrationsInMigrationsDir.length).toBe(1)

        const migrationFileName = stdout[0].split(' ').find((m) => m.indexOf('js') > -1)
        const migrationFilePath = `${process.env.MIGRATIONS_DIR}/${migrationFileName}`
        const migrationFile = fs.readFileSync(migrationFilePath, 'utf-8')
        const template = fs.readFileSync(join(__dirname, '..', 'templates', 'migration.mustache'), 'utf8')
        expect(migrationFile).toEqual(template)
    })
})
