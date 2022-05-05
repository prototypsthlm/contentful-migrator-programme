const contentful = require('contentful-management')

class Space {
    constructor(space, env, locale) {
        this.space = space
        this.env = env
        this.locale = locale
    }

    async typeExists(type) {
        try {
            await this.env.getContentType(type)
            return true
        } catch (e) {
            return false
        }
    }

    createSpaceEnv(id, from) {
        return this.space.createEnvironmentWithId(id, { name: id }, from)
    }

    async deleteSpaceEnv(envId) {
        try {
            const env = await this.space.getEnvironment(envId)
            await env.delete()
        } catch (e) {
            if (e.name !== 'NotFound') {
                throw e
            }
        }
    }

    async getCurrentEnvironmentOfAlias(aliasName) {
        const alias = await this.space.getEnvironmentAlias(aliasName)
        return alias.environment
    }

    getEnvironments() {
        return this.space.getEnvironments()
    }

    async environmentExists(envId) {
        const environments = await this.space.getEnvironments()

        return environments.items.some((environment) => environment.sys.id === envId)
    }

    async switchEnvOfAlias(aliasName, nextEnv) {
        const alias = await this.space.getEnvironmentAlias(aliasName)

        alias.environment.sys.id = nextEnv
        await alias.update()
    }

    async createEntry(type, data) {
        data = Object.entries(data).reduce((memo, [key, value]) => {
            return {
                ...memo,
                [key]: {
                    [this.locale]: value,
                },
            }
        }, {})

        const entry = await this.env.createEntry(type, {
            fields: { ...data },
        })
        await entry.publish()
        return entry
    }

    async createEntries(type, data) {
        for (const d of data) {
            await this.createEntry(type, d)
        }
    }

    async getEntries(type, options = {}) {
        const response = await this.env.getEntries({
            content_type: type,
            limit: 1000,
            ...options,
        })
        return response.items
    }

    getApiKeys() {
        return this.space.getApiKeys()
    }

    async updateApiKeysAccessToNewEnv(envId) {
        const newEnv = {
            sys: {
                type: 'Link',
                linkType: 'Environment',
                id: envId,
            },
        }

        const { items: keys } = await this.getApiKeys()
        await Promise.all(
            keys.map((key) => {
                key.environments.push(newEnv)
                return key.update()
            })
        )
    }
}

module.exports = async (spaceId, envId, accessToken) => {
    const client = contentful.createClient({ accessToken })
    const space = await client.getSpace(spaceId)
    const env = await space.getEnvironment(envId)
    const locale = (await env.getLocales()).items.find((l) => l.default).code
    return new Space(space, env, locale)
}
