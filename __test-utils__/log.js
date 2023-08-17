//utility to get all console log messages in a test context
const originalLog = console.log
var allLogMessages = []

module.exports.extractLogLinesFromConsole = () => {
    console.log = (...args) => {
        allLogMessages.push(args.toString())
        originalLog(...args) //print to default console
    }
    return allLogMessages
}

module.exports.flushLogLines = () => {
    allLogMessages = []
}
