const ctfManagementModule = require('../lib/contentful-space-manager')
require('dotenv').config()
;(async () => {
  try {
    const [, , testEnv] = process.argv

    if (testEnv === 'master') {
      throw new Error('Dropping master is not allowed.')
    }

    const space = await ctfManagementModule(
      process.env.CTF_SPACE,
      testEnv,
      process.env.CTF_CMA_TOKEN
    )

    await space.deleteSpaceEnv(testEnv)
    console.log(`${testEnv} env removed in contentful`)
  } catch (e) {
    console.error(e)
    process.exitCode = 1
  }
})()
