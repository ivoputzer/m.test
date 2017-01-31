const {throws} = require('assert')

test('assertions', function () {
  test('assert.throws via regexp', function () {
    throws(() => {
      throw new Error('has been thrown!')
    }, /thrown!$/g)
  })
})
