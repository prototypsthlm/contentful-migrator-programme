import {info} from "@prototyp-stockholm/contentful-migrator-programme/lib/log.js";

const env = import('../lib/env.js')
import env from '../lib/env.js'
const APPLIED_MIGRATIONS_TYPE_ID = env('APPLIED_MIGRATIONS_TYPE_ID')

module.exports = (migration) => {
    info.log("calling migrations type")
    const migrationsContentType = migration.createContentType(APPLIED_MIGRATIONS_TYPE_ID).name('Applied migrations')

    migrationsContentType.createField('timestamp').name('Timestamp').type('Symbol').required(true)
    migrationsContentType.createField('name').name('Name').type('Symbol').required(true)
    migrationsContentType.createField('batch').name('Batch number').type('Integer').required(true)

    migrationsContentType.displayField('timestamp')
}
