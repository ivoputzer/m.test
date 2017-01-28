const {ok} = require('assert')

test('asynchronous:', function () {
  test('runner works!', function (done) {
    setTimeout(done, 0)
  })

  test('runner works with promise!', function (done) {
    let promise = new Promise(function (resolve, reject) {
      setTimeout(function () {
        resolve(true)
      }, 0)
    })

    promise.then(result => {
      ok(result)
      done()
    })
  })

  test.skip('runner fails!', function (done) {
    setTimeout(done.bind(null, {name: 'AssertionError', message: '', stack: new Error().stack}), 0)
  }, !process.env.DEBUG)

  test.skip('runner fails from exception!', function (done) {
    setTimeout(() => ok(false), 0)
  }, !process.env.DEBUG)
})
