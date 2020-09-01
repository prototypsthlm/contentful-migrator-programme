module.exports = (migration) => {
    const migrations = migration.createContentType('migrations').name('Migrations')

    migrations.createField('timestamp').name('Timestamp').type('Symbol').required(true)

    migrations.displayField('timestamp')
}
