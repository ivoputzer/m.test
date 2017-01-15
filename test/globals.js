const {equal} = require('assert')
const {test} = require('../globals')

test('global variables have been set!', function () {
  equal(global.test, test)
})
