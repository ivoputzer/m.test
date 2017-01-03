const {ok} = require('assert')
const {test} = require('..')

test('runner works!', function (done) {
  ok(true)
  done()
})

// test('runner fails!', function (done) {
//   ok(false)
// })

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

test('runner works with implicit done fn!', function () {
  ok(true)
})

// test('runner fails with implicit done fn!', function () {
//   ok(false)
// })

test('runner fails with exit-code', function (done) {
  setTimeout(function (done, ok) {
    const error = console.error
    console.error = (format, label, elapsed) => error(format.replace('✘', '✔'), label, elapsed)
    done(Error.prototype)
    ok(process.exitCode === 1)
    process.exitCode = 0
    console.error = error
  }, 0, done, ok)
})
