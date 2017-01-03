'use strict'

// const {next} = require('lib/m.next')

function assert(condition, message) {
  if (!condition) throw new Error(message);
}
function* queue(){
  yield
}
function exec(){

}

// function sync(gen) {
//   var iterable, resume;
//   resume = function (err, retVal) {
//     if (err) iterable.raise(err);
//     iterable.next(retVal); // resume!
//   };
//   iterable = gen(resume);
//   iterable.next();
// }


function next(fn){
  let is_done = false
  return function n() {
    try{
      let generator = gene(fn)
      generator.next()
      // while(!is_done) {}
      console.log('next:success')
    }catch(err){
      console.log('next:failure')
    }
  }
  function done() {
    is_done = true
  }
  function* gene(fn) {
    console.log('gene')
    yield fn()
  }
}
function test(desc, fn){
  let context =  next(fn)
  context() // description, indent
}

test('1+1 equals 2', function(){
  assert(1+1 === 2, '1+1 should be 2')
})

test('1+2 equals 4', function(){
  setTimeout(function(){
    assert(1+2 === 4, '1+2 should be 3')
  }, 100)
})

// test('1+2 equals 4', function(done){
//   setTimeout(function(){
//     assert(1+2 === 4, '1+2 should be 4')
//     done()
//   }, 500)
// })

  // do app specific cleaning before exiting
  process.on('exit', function () {
    process.emit('cleanup');
  });

// test('2+2 equals 5', function(done){
//   setTimeout(function(){
//     assert(2+2 === 5, '2+2 should be 5');
//     done()
//   }, 500)
// })
