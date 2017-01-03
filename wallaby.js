// const {test} = require('m.test')

let stack = []

function test(desc, fn){
  let done = Function.prototype
  fn(done)
}

function expect(actual){
  return {
    be: expected => {
      if (actual != expect) throw Error;
    }
  }
}

test('some description', done => {
  expect(done).be(done)
})



// describe('something', function () {
//   it('does something', function (done) {
//     expect(done).to.be.callable()
//   })
// })

// Console.prototype.log = function() {
//   this._stdout.write(
//     util.format.apply(this, arguments) +
//     '\n'
//   )
// }

// let queue = [
//   {
//     0: 'first describe block',
//     1: function(){},
//   },
//   {
//     0: 'second describe block',
//     1: function(){},
//   },
// ]


// let queue = []

// function *dequeue(queue){

// }

// function next(){
//   yield function(){
//   }
//   yield function(){
//   }
// }

// console.log([...dequeue(queue)])

// // process.stdout.write()
//

// A generator function runner
// function next(generator) {
//   let iterator = generator() // create the iterator
//   return [...iterator]
//   // function next(err, arg) {
//   //   if (err) return iterator.throw(err) // if error, throw and error
//   //   let {value, done} = iterator.next(arg) // cache iterator.next(arg) as result
//   //   if (done) return; // are we done?
//   //   if (typeof value == 'function') { // result.value should be our callback() function from the XHR request
//   //     value(next) // call next() as the callback()
//   //   } else {
//   //     next(null, value) // if the response isn't a function, pass it to next()
//   //   }
//   // }
// }

// intiliase and pass in a generator function

// let queue = []

// function describe() {
//   queue.push(function*(){
//   })
// }

// // function* writer(iterable) {
// //   yield* iterable;
// // }

// next(
//   describe('outer', function(){
//     console.log('ciao')
//   })
// )

process.stdin.resume()
