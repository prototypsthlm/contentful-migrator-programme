require('dotenv').config()
const { utcTimestamp } = require('../lib/date')
const ctfManagementModule = require('../lib/contentful-space-manager')

;(async () => {
  try {
    const testEnv = 'test' + utcTimestamp()
    await require('../migrator')(testEnv)
    const space = await ctfManagementModule(
      process.env.CTF_SPACE,
      testEnv,
      process.env.CTF_CMA_TOKEN.env
    )
    await space.deleteSpaceEnv(testEnv)
    console.log(`${testEnv} env removed in contentful`)
  } catch (e) {
    process.exitCode = 1
  }
})()
