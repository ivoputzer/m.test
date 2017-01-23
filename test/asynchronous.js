const {ok} = require('assert')

test('asynchronous', function () {
  test('runner works!', function (done) {
    setTimeout(() => done(), 0)
  })
  test.skip('runner fails!', function (done) {
    setTimeout(() => done({name: 'AssertionError', message: ''}), 0)
  }, !process.env.DEBUG)
  test.skip('runner fails from exception!', function (done) {
    setTimeout(() => ok(false), 0)
  }, !process.env.DEBUG)
})
