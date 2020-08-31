require('dotenv').config()
;(async () => {
  try {
    await require('../migrator')()
  } catch (e) {
    process.exitCode = 1
  }
})()
