const {ok} = require('assert')
const {test} = require('..')

test('runner works!', function (done) {
  ok(true)
  done()
})

test('runner fails!', function (done) {
  ok(false)
  done()
})

test('runner works async!', function (done) {
  setTimeout(function (done) {
    done()
  }, 0, done)
})
