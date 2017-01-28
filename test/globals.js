const {ok} = require('assert')

test('globals:', function () {
  test('exports `test` function!', function () {
    ok(require('../globals').hasOwnProperty('test'))
  })

  test('exports `beforeEach` function!', function () {
    ok(require('../globals').hasOwnProperty('beforeEach'))
  })

  test('exports `afterEach` function!', function () {
    ok(require('../globals').hasOwnProperty('afterEach'))
  })
})
