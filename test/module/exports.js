const {ok} = require('assert')

test('module/exports:', function () {
  const exports = require('../..')

  test('exports `test` property!', function () {
    ok(exports.hasOwnProperty('test'))
  })

  test('exports `beforeEach` property!', function () {
    ok(exports.hasOwnProperty('beforeEach'))
  })

  test('exports `afterEach` property!', function () {
    ok(exports.hasOwnProperty('afterEach'))
  })
})
