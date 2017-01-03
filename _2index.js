'use strict'

const path = require('path')

let suite = []
  , count = 0
  , ident = 0

function context(desc, ...fn){
  return fn = fn[1] || fn[0]
       , fn()
       , suite.push({desc, fn})
}

function it(){
  return context(...arguments)
}

function test(files){
  // return {
  //   use: function () {
  //     // console.log('test.use(%s)', [...arguments])
  //   },
  //   run: function () {
  //     // console.log('test.run(%s)', [...arguments])
  //     console.log(suite)
  //     return this
  //   },
  //   out: function (fn) {
  //     // console.log('test.out(%s)', 'stdout')
  //     return this
  //   }
  // }
}

module.exports = {test}