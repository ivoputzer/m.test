const { ok } = require('assert')

test('hooks:', function () {
  let beforeEachCalled, afterEachCalled

  test('before each hook has been called', function () {
    ok(beforeEachCalled)
  })

  test('after each hook has been called', function () {
    ok(afterEachCalled)
  })

  beforeEach(() => {
    beforeEachCalled = true
  })

  afterEach(() => {
    afterEachCalled = true
  })
})
