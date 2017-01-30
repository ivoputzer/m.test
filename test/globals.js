const {ok} = require('assert')

test('global:', function () {
  test('exports `test` function!', function () {
    ok(require('../global').hasOwnProperty('test'))
  })

  test('exports `beforeEach` function!', function () {
    ok(require('../global').hasOwnProperty('beforeEach'))
  })

  test('exports `afterEach` function!', function () {
    ok(require('../global').hasOwnProperty('afterEach'))
  })
})
