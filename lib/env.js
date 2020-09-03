const defaults = {
    MIGRATIONS_DIR: 'migrations',
    MIGRATIONS_TYPE: 'appliedMigrations',
    ENV_AMOUNT: 3,
    ALIAS_AMOUNT: 1,
}

module.exports = (name) => {
    if (!process.env[name] && !defaults[name]) {
        throw new Error(`Environment variable ${name} is not set.`)
    }
    return process.env[name] || defaults[name]
}
