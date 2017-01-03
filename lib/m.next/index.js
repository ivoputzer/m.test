'use strict'
// m.next is a simple queue for fast function chain building

// spec:

// use.run = function run() {
//       var args = slice(arguments)
//         , stack = calls.concat()
//         , done;
//       if (isval(args[args.length - 1], 'function')) {
//         done = args.pop();
//       }
//       if (!stack.length) {
//         if (done) { done.call(context); }
//         return;
//       }
//       args.push(next);
//       function exec() {
//         stack.shift().apply(context, args);
//       }
//       function next(err, fin) {
//         if (err || fin || !stack.length) {
//           stack = null;
//           if (done) { done.call(context, err); }
//           return;
//         }
//         exec();
//       }
//       exec();
//     };
// function is_value(){

// }

// Middleware.prototype.go = function go (next) {
//   next();
// };

// Middleware.prototype.use = function use (fn) {
//   var self = this;
//   this.go = (function(stack) {
//     return function(next) {
//       stack.call(self, function() {
//         fn.call(self, next.bind(self));
//       });
//     }.bind(this);
//   })(this.go);
// };

/*
  m.next `!{ next: [Function] }`
  ===

  function fn1(next){
    next()
  }

  function fn2(next){
    next()
  }

  let fn = next(fn1, fn2)
    , result = fn('arguments passed to functions')
*/
/*
function next(fn, ...queue){
  let context = null
  return fn
    ? function(){
      return context = fn(next(...queue))
    }
    : function(){
      return context
    }
}
*/

function next(fn, ...queue){
  return (function*() {
  })()
}

function a(next){
  console.log('a', next)
}

function b(next){
  console.log('b', next)
}

function c(next){
  console.log('c', next)
}

let callable = next(a, b, c)

console.log(callable.toString())

console.log("result ==>", callable())

module.exports = {next}


/*

const whatever = Error.prototype
  , {m} = require('m.icro')
  , {next} = require('m.next')
  , {test} = require('m.test')
  , {expect} = require('m.expect')
  , {inject} = require('m.inject')

test('along with some information on the subject', => {
  let theSubject
  it('does what you expect it to do', function(whatever){
    expect(theSubject).to.be(whatever)
  })
})

*/
