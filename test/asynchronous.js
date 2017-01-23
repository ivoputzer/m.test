// const {ok} = require('assert')
const {test} = require('..')

test('asynchronous', function () {
  test('runner works!', function (done) {
    setTimeout(() => done(), 0)
  })
  test.skip('runner fails!', function (done) {
    setTimeout(() => done(Error()), 0)
  }, !process.env.DEBUG)
})

// test.timeout('runner fails async with timeout!', function (done) {
//   setTimeout(() => done(), 100)
// }, 50)

// test.timeout('runner works!', function (done) {
//   setTimeout(() => done(), 100)
// }, 50, false)

// test.timeout('retrieves google', function (done) {
//   require('http').get({
//     host: 'google.com',
//     path: '/'
//   }, done.bind(null, null))
// }, 100)
