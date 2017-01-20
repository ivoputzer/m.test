const {ok} = require('assert')

test('module/globals', function () {
  const exports = require('../../globals')

  test('assigns `test` property globally', function () {
    ok(global.hasOwnProperty('test'))
  })

  test('exports `test` property', function () {
    ok(exports.hasOwnProperty('test'))
  })
})
