'use strict'

function next(fn){
  let is_done = false
  return () => {
    let x = wait(fn, done)
      , last 
    console.log('-- next x', x)
    try {
    } catch() {
    }
    console.log('-- next x:next', is_done, last)
  }
  function done(){
    console.log('-- done', is_done = true)
  }
  function* wait(fn, done){
    try {
      console.log('-- async:fn')
      fn(done)
      console.log('-- async:yield', y)
      // while (!is_done) yield;
      console.log('-- async:success')
    }catch(err){
      console.log('-- async:failure', err)
    }
  }
}

function test(desc, fn){
  try {
    fn = next(fn)
    console.log('-- test:success', fn())
  }catch(err){
    console.log('-- test:failure', err)
  }
}

test('test', function* (){
  console.log('-- test')
  setTimeout(function(){
    console.log('-- timeout')
    yield // throw new Error('assertion error')
  }, 500)
})

// var gen = sayHello();
// gen.next();