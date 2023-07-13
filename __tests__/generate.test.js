const { execaNode } = require('execa')
const fs = require('fs')
const { join } = require('path')

//todo: rewrite to match refactored other tests?
describe('generate', () => {
    it('should create a new migration file', async () => {
        const migrationName = 'test-migration'
        const { stdout } = await execaNode('./bin/cmp.js', ['generate', migrationName])

        const migrationFileName = stdout.split(' ').find((m) => m.indexOf('js') > -1)
        const migrationFile = fs.readFileSync(`${process.env.MIGRATIONS_DIR}/${migrationFileName}`, 'utf-8')

        const template = fs.readFileSync(join(__dirname, '..', 'templates', 'migration.mustache'), 'utf8')

        expect(migrationFile).toEqual(template)
    })
})
