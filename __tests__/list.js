const {execa} = require("execa");
const {apply} = require("../src/migrator");
const fs = require('fs')
const {join} = require("path");
const {createSimpleMigrationFile} = require("../__test-utils__/20230602075003099-migration-name");
describe('list', () => {
    it('should log that no migrations are applied', async () => {
        const {stdout} = await execa('./bin/cmp.js', ['list'])
        expect(stdout).toMatch('Found no applied migrations')
    });


/*    it('should log that migrations are applied', async () => {
        await createSimpleMigrationFile()
        await apply()
        let {stdout}  = await execa('./bin/cmp.js', ['list'])
        expect(stdout).toMatch('Applied migrations:')

        //todo: teardown / rollback migration
        await apply({rollback: true} )
        stdout  = await execa('./bin/cmp.js', ['list'])
        expect(stdout).toMatch('Found no applied migrations')
    });*/
})

