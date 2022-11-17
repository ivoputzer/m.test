const { ok } = require('assert')

test('module/exports:', function () {
  const exports = require('../..')

  test('exports `test` property!', function () {
    ok(Object.hasOwn(exports, 'test'))
  })

  test('exports `beforeEach` property!', function () {
    ok(Object.hasOwn(exports, 'beforeEach'))
  })

  test('exports `afterEach` property!', function () {
    ok(Object.hasOwn(exports, 'afterEach'))
  })
})
