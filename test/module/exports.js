const {ok} = require('assert')

test('module/exports', function () {
  const exports = require('../..')

  test('exports `test` property', function () {
    ok(exports.hasOwnProperty('test'))
  })
})
