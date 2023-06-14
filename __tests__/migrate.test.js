const { execaNode
} = require("execa");

describe('migrate', () => {
    it('should demand user to use "--force" flag if running against master space', async () => {
        process.env.CTF_ENVIRONMENT_ID = 'master'
        const { stdout } = await execaNode('./bin/cmp.js', ['migrate'])
        expect(stdout).toMatch('Executing migrations against master requires the --force flag.')
    })

    it('apply migrations when supplying the --force flag', async () => {
        process.env.CTF_ENVIRONMENT_ID = 'master'
        const { stdout } = await execaNode('./bin/cmp.js', ['migrate --force'])
        //expect(stdout).toMatch('Executing migrations against master requires the --force flag.')
    })
})
