const {ok} = require('assert')
const {test} = require('..')

test('1 runner works as a structural element!', function () {
  test('2 runner works when nested!', function () {
    test('3 runner works recursively and adjusts execution queue!', function () {
      test('4 runner works!', function () {
        ok(true)
      })
      // test('4 runner fails!', function () {
      //   ok(false)
      // })
    })
  })
})
