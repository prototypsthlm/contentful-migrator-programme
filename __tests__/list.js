const { execa } = require("execa");
describe('list', () => {
    it('should log that no migrations are applied', async () => {
        const { stdout } = await execa('./bin/cmp.js', ['list'])
        expect(stdout).toMatch('Found no applied migrations')
    })
})