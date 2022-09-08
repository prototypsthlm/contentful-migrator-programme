const fs = require('fs')
const Path = require('path')

const deleteFolderRecursive = (path) => {
  if (fs.existsSync(path)) {
    fs.readdirSync(path).forEach((file) => {
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

beforeAll(() => {
  process.env.MIGRATIONS_DIR = '__test-migrations__'
})

afterAll(() => {
  deleteFolderRecursive(process.env.MIGRATIONS_DIR)
})
