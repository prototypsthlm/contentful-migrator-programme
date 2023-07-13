const { handler: resetCommand } = require('../bin/commands/reset')
const { extractLogLinesFromConsole } = require('../__test-utils__/log')

describe('reset', () => {
    it('should not reset environment if on master', async () => {
        const stdout = extractLogLinesFromConsole()
        await resetCommand({ force: false })
        expect(stdout).toContain(`Can't reset environment if you are on master.`)
    })
})
