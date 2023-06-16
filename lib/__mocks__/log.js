const chalk = require('chalk')

module.exports.default = {
    info: (...message) => console.log(),
    success: (...message) => console.log(...message),
    error: (...message) => console.log(...message),
    warn: (...message) => console.log(...message),
}
