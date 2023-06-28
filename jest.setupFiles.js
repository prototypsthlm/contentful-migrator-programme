const dotenv = require("dotenv")
dotenv.config({ path: './.env.test' })

//mock lib/log since encoding characters from chalk makes testing difficult
jest.mock('./lib/log', () => {
    console.log("Setting up mocked log")
    return {
        _esModule: false,
        info: (...message) => console.log(...message),
        success: (...message) => console.log(...message),
        error: (...message) => console.log(...message),
        warn: (...message) => console.log(...message),
    }
})