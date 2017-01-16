const {ok} = require('assert')
const {beforeEach, afterEach, test} = require('..')

test('hooks', function () {
  let beforeEachCalled, afterEachCalled
  test('before each hook has been called', function () {
    ok(beforeEachCalled)
  })
  test('after each hook has been called', function () {
    ok(afterEachCalled)
  })
  beforeEach(function () {
    beforeEachCalled = true
  })
  afterEach(function () {
    afterEachCalled = true
  })
})
