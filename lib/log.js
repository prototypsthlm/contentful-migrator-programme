const chalk = require('chalk')

module.exports = {
  info: (...message) => console.log(chalk.blue(...message)),
  success: (...message) => console.log(chalk.green(...message)),
  error: (...message) => console.log(chalk.red(...message)),
  warn: (...message) => console.log(chalk.yellow(...message)),
}
