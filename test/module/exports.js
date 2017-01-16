const {ok} = require('assert')

test('module/exports', function () {
  const exports = require.main.require.call(require, '.')

  test('exports a test method!', function () {
    ok(exports.hasOwnProperty('test'))
  })
})
