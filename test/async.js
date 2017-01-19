// const {ok} = require('assert')
const {test} = require('..')

test('async', function () {
  test('runner works async!', function (done) {
    setTimeout(() => done(), 0)
  })

  // test('runner fails (1) async!', function (done) {
  //   setTimeout(() => done(Error.prototype), 0)
  // })
  //
  // test('runner fails (2) async!', function (done) {
  //   setTimeout(() => done(Error.prototype), 0)
  // })
  //
  // test('runner fails async with implicit done!', function (done) {
  //   setTimeout(() => {
  //     ok(false)
  //     done()
  //   }, 0)
  // })
})
