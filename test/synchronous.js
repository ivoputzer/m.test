const {ok} = require('assert')

test('synchronous', function () {
  test('runner works!', function () {
    ok(true)
  })
  test.skip('runner fails!', function () {
    ok(false)
  }, !process.env.DEBUG)
})

// afterEach(() => {
//   // stdout === '✔ runner works! (2ms)'
//   // assert che è stato scritto sullo standard-out?
// })
