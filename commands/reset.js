require('dotenv').config()
const spaceModule = require('../lib/contentful-space-manager')

;(async () => {
  try {
    if (process.env.CTF_ENVIRONMENT === 'master') {
      console.error(`Can't reset environment if you are on master.`)
      return
    }

    const currentSpace = await spaceModule(
      process.env.CTF_SPACE,
      process.env.CTF_ENVIRONMENT,
      process.env.CTF_CMA_TOKEN
    )
    console.info(`Deleting ${process.env.CTF_ENVIRONMENT} environment.`)
    await currentSpace.deleteSpaceEnv(process.env.CTF_ENVIRONMENT)
    console.info(`Deleted ${process.env.CTF_ENVIRONMENT} environment.`)

    console.info(
      `Creating ${process.env.CTF_ENVIRONMENT} environment cloning from master.`
    )
    await currentSpace.createSpaceEnv(process.env.CTF_ENVIRONMENT, 'master')
    console.info(`Created ${process.env.CTF_ENVIRONMENT} environment.`)

    console.info(`Updating API key to work with the recreated env`)
    await currentSpace.updateApiKeysAccessToNewEnv(process.env.CTF_ENVIRONMENT)
    console.info(`Updates API key to work with the recreated env`)
  } catch (e) {
    process.exitCode = 1
  }
})()
