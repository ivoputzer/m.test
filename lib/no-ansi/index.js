module.exports = require('stream').Transform({
  transform (data, enc, next) {
    next(null, data.toString().replace(/[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-PRZcf-nqry=><]/g, ''))
  }
})
