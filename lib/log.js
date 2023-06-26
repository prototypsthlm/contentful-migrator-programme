const pc = require('picocolors')

module.exports = {
    info: (...message) => console.log(pc.blue(message)),
    success: (...message) => console.log(pc.green(message)),
    error: (...message) => console.log(pc.red(message)),
    warn: (...message) => console.log(pc.yellow(message)),
}
