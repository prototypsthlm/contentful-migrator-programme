const fs = require('fs')
const { join } = require('path')
const Mustache = require('mustache')
const { utcTimestampMs } = require('../lib/date')
// eslint-disable-next-line no-global-assign
require = require('esm')(module)
const { camelToKebabCase } = require('../lib/string')

const [, , name] = process.argv

const templatePath = fs.readFileSync(
  join(__dirname, '..', 'templates', 'migration.tpl'),
  'utf8'
)

const migrationContents = Mustache.render(templatePath)
const migrationFileName = `${utcTimestampMs()}-${camelToKebabCase(name)}.js`
const migrationPath = join(
  __dirname,
  '..',
  '..',
  'migrations',
  migrationFileName
)

fs.writeFile(migrationPath, migrationContents, { flag: 'w' }, (err) => {
  if (err) {
    console.error('Migration creation failed. See:', err)
    return
  }
  console.info(`Migration file ${migrationFileName} created`)
})
