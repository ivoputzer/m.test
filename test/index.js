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
    const _log = console.log
    const _error = console.error
    console.log = (format, ...rest) => _log(format.replace('\x1b[31m✘\x1b[0m', '\x1b[32m✔\x1b[0m'), ...rest)
    console.error = Function.prototype
    done(Error.prototype)
    ok(process.exitCode === 1)
    process.exitCode = 0
    console.log = _log
    console.error = _error
  }, 0, done, ok)
})
