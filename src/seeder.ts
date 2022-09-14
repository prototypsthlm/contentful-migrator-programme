import CmpSpace from './lib/contentful-space-manager'

const seed = async ({ spaceId, environmentId, accessToken }, type, data) => {
  const space = await CmpSpace(spaceId, environmentId, accessToken)
  await space.createEntries(type, data)
}

module.exports = {
  seed,
}
