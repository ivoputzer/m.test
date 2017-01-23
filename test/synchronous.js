const {ok} = require('assert')

test('synchronous', function () {
  test('runner works!', function () {
    ok(true)
  })
  test.skip('runner fails!', function () {
    ok(false)
  }, !process.env.DEBUG)
})
