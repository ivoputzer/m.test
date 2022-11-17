const { ok } = require('assert')

test('module/global:', function () {
  const exports = require.main.require.call(require, './global.js')

  test('exports `test` property!', function () {
    ok(Object.hasOwn(exports, 'test'))
  })

  test('exports `beforeEach` property!', function () {
    ok(Object.hasOwn(exports, 'beforeEach'))
  })

  test('exports `afterEach` property!', function () {
    ok(Object.hasOwn(exports, 'afterEach'))
  })

  test('assigns `test` globally!', function () {
    ok(Object.hasOwn(exports, 'test'))
  })

  test('assigns `beforeEach` globally!', function () {
    ok(Object.hasOwn(exports, 'beforeEach'))
  })

  test('assigns `afterEach` globally!', function () {
    ok(Object.hasOwn(exports, 'afterEach'))
  })
})
