const { strictEqual } = require('assert')

test('timeout:', function () {
  test('exports `test.timeout` function!', function () {
    strictEqual(typeof test.timeout, 'function')
  })

  test.timeout('runner works!', function (done) {
    setTimeout(done, 50)
  }, 100)
})

// test.skip('debug:', function () {
//   test.timeout('runner fails!', function (done) {
//     setTimeout(done, 100)
//   }, 50, !process.env.DEBUG)

// test.timeout('runner fails async with timeout!', function (done) {
//   setTimeout(() => done(), 100)
// }, 50)
//
// test.timeout('runner fails async with timeout!', function (done) {
//   setTimeout(() => done(), 100)
// }, 50)
//
//
//
// test.timeout('retrieves google', function (done) {
//   require('http').get({
//     host: 'google.com',
//     path: '/'
//   }, done.bind(null, null))
// }, 100)
