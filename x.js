'use strict'

const assert = require('assert')

function it(fn){
  console.log('it')
  let iterator = fn(next)
  return next()
  
  function next(){
    try {
      yield async()

      console.log('::success', iterator.next())
    }catch(err){
      console.log('::failure')
    }
    // check for expections
    // let {value, done} = iterator.next(next)
  }
}

it(function (next){
  let my_value = yield setTimeout(function(){
    assert(1)
    return 555
    next()
  }, 200)
  console.log(my_value)
})

// it(function* (){
//   setTimeout(function(){
//     assert(0)
//   })
// })