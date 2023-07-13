const { join } = require('path')
const fs = require('fs')

module.exports.createSimpleMigrationFile = () => {
    const content = `
    module.exports.up = (migration, context) => {
        const populationCategories = migration
            .createContentType('testContentType')
            .name('Test content type')
            .description('')
            .displayField('testContentId')
    
        populationCategories
            .createField('testContentId')
            .name('test content id')
            .type('Symbol')
        }
    
    module.exports.down = (migration, context) => {
        migration.deleteContentType('testContentType')
    }`
    const migrationsDir = process.env.MIGRATIONS_DIR
    const migrationFileName = '20230609122547608-new-migration.js'
    const migrationPath = join(migrationsDir, migrationFileName)

    fs.writeFileSync(migrationPath, content, (err) => {
        if (err) {
            console.error(err)
            return
        }
        console.log('File created successfully!')
    })
}
