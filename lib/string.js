const zeroFill = (number, width) => {
  return new Array(+width + 1 - (number + '').length).join('0') + number
}

const camelToKebabCase = (string) =>
  string.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase()

const camelToSnakeCase = (string) =>
  string
    .replace(/(.)([A-Z][a-z]+)/, '$1_$2')
    .replace(/([a-z0-9])([A-Z])/, '$1_$2')
    .toLowerCase()

module.exports = {
  zeroFill,
  camelToKebabCase,
  camelToSnakeCase,
}
