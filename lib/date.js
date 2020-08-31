const { zeroFill } = require('../lib/string')

const now = () => {
  const now = new Date()
  return {
    utcYear: () => now.getUTCFullYear(),
    utcMonth: () => zeroFill(now.getUTCMonth() + 1 /* January is 0 */, 2),
    utcDay: () => zeroFill(now.getUTCDate(), 2),
    utcHours: () => zeroFill(now.getUTCHours(), 2),
    utcMinutes: () => zeroFill(now.getUTCMinutes(), 2),
    utcSeconds: () => zeroFill(now.getUTCSeconds(), 2),
    utcMilliseconds: () => zeroFill(now.getUTCMilliseconds(), 3),
  }
}

const utcTimestampMs = (options = { dashes: false }) => {
  const n = now()

  return options.dashes
    ? `${n.utcYear()}-${n.utcMonth()}-${n.utcDay()}-${n.utcHours()}-${n.utcMinutes()}-${n.utcSeconds()}-${n.utcMilliseconds()}`
    : `${n.utcYear()}${n.utcMonth()}${n.utcDay()}${n.utcHours()}${n.utcMinutes()}${n.utcSeconds()}${n.utcMilliseconds()}`
}

const utcTimestamp = (options = { dashes: false }) => {
  const n = now()

  return options.dashes
    ? `${n.utcYear()}-${n.utcMonth()}-${n.utcDay()}-${n.utcHours()}-${n.utcMinutes()}-${n.utcSeconds()}`
    : `${n.utcYear()}${n.utcMonth()}${n.utcDay()}${n.utcHours()}${n.utcMinutes()}${n.utcSeconds()}`
}

module.exports = {
  utcTimestampMs,
  utcTimestamp,
}
