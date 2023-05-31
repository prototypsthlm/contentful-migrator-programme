import env from '../lib/env.js'
const APPLIED_MIGRATIONS_TYPE_ID = env('APPLIED_MIGRATIONS_TYPE_ID')

export default function migrationsType (migration) {
    log.info("CALLING MIGRATIONS TYPE")
    const migrationsContentType = migration.createContentType(APPLIED_MIGRATIONS_TYPE_ID).name('Applied migrations')

    migrationsContentType.createField('timestamp').name('Timestamp').type('Symbol').required(true)
    migrationsContentType.createField('name').name('Name').type('Symbol').required(true)
    migrationsContentType.createField('batch').name('Batch number').type('Integer').required(true)

    migrationsContentType.displayField('timestamp')
}
