export const defaults = {
    MIGRATIONS_DIR: 'migrations',
    APPLIED_MIGRATIONS_TYPE_ID: 'appliedMigrations',
    MAX_NUMBER_OF_ENVIRONMENTS: 4,
    MAX_NUMBER_OF_ALIASES: 1,
    NUMBER_OF_RETRIES_WHEN_CREATING_ENVIRONMENT: 10
}

export default function env(name) {
    if (!process.env[name] && !defaults[name]) {
        throw new Error(`Environment variable ${name} is not set.`)
    }
    return process.env[name] || defaults[name]
}
