const defaults = {
    MIGRATIONS_DIR: 'migrations',
    MIGRATION_HISTORY_TYPE_ID: 'appliedMigrations',
    MAX_NUMBER_OF_ENVIRONMENTS: 3,
    MAX_NUMBER_OF_ALIASES: 1,
}

module.exports = (name) => {
    if (!process.env[name] && !defaults[name]) {
        throw new Error(`Environment variable ${name} is not set.`)
    }
    return process.env[name] || defaults[name]
}
