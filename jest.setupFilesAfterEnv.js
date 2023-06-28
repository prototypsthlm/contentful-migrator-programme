const fs = require('fs')
const Path = require('path')

beforeAll(() => {
    let migrationsDir = process.env.MIGRATIONS_DIR
    if (!fs.existsSync(migrationsDir)){
        fs.mkdirSync(migrationsDir)
    }
})

afterAll(() => {
    deleteFolderRecursive(process.env.MIGRATIONS_DIR)
})

const deleteFolderRecursive = function (path) {
    if (fs.existsSync(path)) {
        fs.readdirSync(path).forEach((file, index) => {
            const curPath = Path.join(path, file)
            if (fs.lstatSync(curPath).isDirectory()) {
                deleteFolderRecursive(curPath)
            } else {
                fs.unlinkSync(curPath)
            }
        })
        fs.rmdirSync(path)
    }
}
