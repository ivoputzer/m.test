const {equal} = require('assert')

test('timeout', function () {
  test('exports `timeout` modifier!', function () {
    console.log(test.timeout)
    // equal(typeof test.timeout, 'function')
  })
  test.timeout('runner fails async with timeout!', function (done) {
    setTimeout(() => done(), 100)
  }, 50)
  test.timeout('runner works!', function (done) {
    setTimeout(() => done(), 100)
  }, 50, false)
  test.timeout('retrieves google', function (done) {
    require('http').get({
      host: 'google.com',
      path: '/'
    }, done.bind(null, null))
  }, 100)
})
