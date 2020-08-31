require('dotenv').config()
const { utcTimestamp } = require('../lib/date')

;(async () => {
  try {
    const testEnv = 'test' + utcTimestamp()
    await require('../migrator')(testEnv)
    console.log('###########################################')
    console.log('Contentful test env:', testEnv)
    console.log('###########################################')
    console.log(
      `Configure that into your local "CTF_ENVIRONMENT" to test out and remember to delete it after with: "yarn m:drop-aux-env ${testEnv}"`
    )
  } catch (e) {
    process.exitCode = 1
  }
})()
