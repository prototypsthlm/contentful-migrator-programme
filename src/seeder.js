//const spaceModule = require('../lib/contentful-space-manager')
import spaceModule from '../lib/contentful-space-manager.js'

const seed = async ({ spaceId, environmentId, accessToken }, type, data) => {
    const space = await spaceModule(spaceId, environmentId, accessToken)
    await space.createEntries(type, data)
}

module.exports = {
    seed,
}
