const env = require('../lib/env')
const MIGRATIONS_TYPE = env('MIGRATIONS_TYPE')

module.exports = (migration) => {
    const migrationsContentType = migration.createContentType(MIGRATIONS_TYPE).name('Applied migrations')

    migrationsContentType.createField('timestamp').name('Timestamp').type('Symbol').required(true)
    migrationsContentType.createField('name').name('Name').type('Symbol').required(true)

    migrationsContentType.displayField('timestamp')
}
