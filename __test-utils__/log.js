module.exports.extractLogLinesFromConsole = () => {
    //todo: remove encodings from Chalk
    const originalLog = console.log;
    const allLogMessages = [];
    console.log = (...args) => {
        allLogMessages.push(args.toString());
        originalLog(...args); //print to default console
    }
    return allLogMessages;
}