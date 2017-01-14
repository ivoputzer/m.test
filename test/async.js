const {ok} = require('assert')
const {test} = require('..')

test('runner works async!', function (done) {
  setTimeout(function (done) {
    done()
  }, 0, done)
})

// test('runner fails async!', function (done) {
//   setTimeout(function (done) {
//     done(Error.prototype)
//   }, 0, done)
// })

test('runner works with implicit async done!', function () {
  ok(true)
})

// test('runner fails with implicit async done!', function () {
//   ok(false)
// })
