const {ok} = require('assert')

test('module/exports-global', function () {
  const exports = require.main.require.call(require, './global.js')

  test('exports `test` property!', function () {
    ok(exports.hasOwnProperty('test'))
  })

  test('exports `beforeEach` property!', function () {
    ok(exports.hasOwnProperty('beforeEach'))
  })

  test('exports `afterEach` property!', function () {
    ok(exports.hasOwnProperty('afterEach'))
  })

  test('assigns `test` globally!', function () {
    ok(exports.hasOwnProperty('test'))
  })

  test('assigns `beforeEach` globally!', function () {
    ok(exports.hasOwnProperty('beforeEach'))
  })

  test('assigns `afterEach` globally!', function () {
    ok(exports.hasOwnProperty('afterEach'))
  })
})
