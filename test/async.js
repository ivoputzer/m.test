// const {ok} = require('assert')
const {test} = require('..')

test('async', function () {
  test.timeout('runner works async with timeout!', function (done) {
    setTimeout(() => done(), 50)
  }, 100)

  // test.timeout('runner fails async with timeout!', function (done) {
  //   setTimeout(() => done(), 100)
  // }, 50)

  test.timeout('runner works async with timeout and skip!', function (done) {
    setTimeout(() => done(), 100)
  }, 50, false)

  // test.timeout('retrieves google', function (done) {
  //   require('http').get({
  //     host: 'google.com',
  //     path: '/'
  //   }, done.bind(null, null))
  // }, 100)
})
