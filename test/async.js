const {ok} = require('assert')
const {test} = require('..')

test('runner works async!', function (done) {
  setTimeout(done, 0)
})

// test('runner fails async!', function (done) {
//   setTimeout(() => done(Error.prototype), 0)
// })

test('runner fails async with implicit done!', function () {
  setTimeout(() => ok(false), 0)
})
