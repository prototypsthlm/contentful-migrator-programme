const execa = require('execa')

describe('migrate', () => {
    it('should demand user to use "--force" flag if running against master space', async () => {
        process.env.CTF_ENVIRONMENT = 'master'
        const { stderr } = await execa('cmp', ['migrate'])
        expect(stderr).toEqual('Executing migrations against master requires the --force flag.')
    })
})
