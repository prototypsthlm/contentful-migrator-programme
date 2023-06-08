const fs = require('fs')
const Path = require('path')

beforeAll(() => {
    let migrationsDir = '__test-migrations__'
    if (!fs.existsSync(migrationsDir)){
        fs.mkdirSync(migrationsDir);
    }
    process.env.MIGRATIONS_DIR = migrationsDir
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
