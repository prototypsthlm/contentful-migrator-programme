const { zeroFill } = require('./string')

const now = () => {
  const d = new Date()
  return {
    utcYear: () => d.getUTCFullYear(),
    utcMonth: () => zeroFill(d.getUTCMonth() + 1 /* January is 0 */, 2),
    utcDay: () => zeroFill(d.getUTCDate(), 2),
    utcHours: () => zeroFill(d.getUTCHours(), 2),
    utcMinutes: () => zeroFill(d.getUTCMinutes(), 2),
    utcSeconds: () => zeroFill(d.getUTCSeconds(), 2),
    utcMilliseconds: () => zeroFill(d.getUTCMilliseconds(), 3),
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
