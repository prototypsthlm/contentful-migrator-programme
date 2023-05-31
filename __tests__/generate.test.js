import execa from "execa";
import fs from "fs"
import {join} from "path"
import * as path from "path"
import {fileURLToPath} from "url";

describe('generate', () => {
    it('should create a new migration file', async () => {
        const migrationName = 'test-migration'
        const { stdout } = await execa.node('./bin/cmp.js', ['generate', migrationName])

        const migrationFileName = stdout.split(' ').find((m) => m.indexOf('js') > -1)
        const migrationFile = fs.readFileSync(`${process.env.MIGRATIONS_DIR}/${migrationFileName}`, 'utf-8')

        const __dirname = path.dirname(fileURLToPath(import.meta.url))
        const template = fs.readFileSync(join(__dirname, '..', 'templates', 'migration.mustache'), 'utf8')

        expect(migrationFile).toEqual(template)
    })
})
