'use strict'

// m.await

function* gen(fn){
  yield fn()
}

function test(desc, fn){
  let iterator = gen(fn)
    , {value, done} = iterator
  console.log(desc, value)
}

test('test', function (done){
  console.log('test.fn')
  setTimeout(function(){
    console.log('test.fn.timeout')
    // done()
  })
})