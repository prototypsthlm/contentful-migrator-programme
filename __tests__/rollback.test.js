const fs = require('fs')
const { join } = require('path')
const { handler: rollbackCommand } = require('../bin/commands/rollback')
const { setupMockedContentfulApi, closeMockedContentfulApi } = require('../mocks/contentful/baseContentfulHandler')

describe('rollback', () => {
    it('should demand user to use "--force" flag if running against master space', async () => {
        setupMockedContentfulApi()

        let result = await rollbackCommand({ force: false })
        expect(result).toBe('Executing migrations against master requires the --force flag.')

        closeMockedContentfulApi()
    })
})
