'use strict'

let {test} = require('.')

test('c1', function(){
  test('c1, i1', function(){})
  test('c1.1', function(){
    test('c1.1, i1', function(){})
  })
  test('c1, i2', function(){})
})