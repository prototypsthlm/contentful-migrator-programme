import execa from "execa";

describe('migrate', () => {
    it('should demand user to use "--force" flag if running against master space', async () => {
        process.env.CTF_ENVIRONMENT_ID = 'master'
        const { stdout } = await execa.node('./bin/cmp.js', ['migrate'])
        expect(stdout).toMatch('Executing migrations against master requires the --force flag.')
    })
})
