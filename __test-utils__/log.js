//utility to get all console log messages in a test context
module.exports.extractLogLinesFromConsole = () => {
    const originalLog = console.log;
    const allLogMessages = [];
    console.log = (...args) => {
        allLogMessages.push(args.toString())
        originalLog(...args) //print to default console
    }
    return allLogMessages;
}