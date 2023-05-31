import fs from "fs"
import * as Path from "path"

import * as dotenv from 'dotenv';

dotenv.config({ path: './.env.test' });

beforeAll(() => {
    //process.env.MIGRATIONS_DIR = '__test-migrations__'
    dotenv.config({ path: './.env.test' });

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
