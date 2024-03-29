const fs = require('fs')
const { join } = require('path')
const { handler: rollbackCommand } = require('../bin/commands/rollback')
const { extractLogLinesFromConsole } = require('../__test-utils__/log')
const { handler: migrateCommand } = require('../bin/commands/migrate')

describe('rollback', () => {
    it('should demand user to use "--force" flag if running against master space', async () => {
        const stdout = extractLogLinesFromConsole()
        await rollbackCommand({ force: false })
        expect(stdout).toContain('Executing migrations against master requires the --force flag.')
    })
})
