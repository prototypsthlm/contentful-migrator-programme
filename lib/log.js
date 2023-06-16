const chalk = require('chalk')

module.exports = {
    //todo: handle the encodings from Chalk in test suite
    /*info: (...message) => console.log(chalk.blue(...message)),
    success: (...message) => console.log(chalk.green(...message)),
    error: (...message) => console.log(chalk.red(...message)),
    warn: (...message) => console.log(chalk.yellow(...message)),*/
    info: (...message) => console.log(...message),
    success: (...message) => console.log(...message),
    error: (...message) => console.log(...message),
    warn: (...message) => console.log(...message),
}
