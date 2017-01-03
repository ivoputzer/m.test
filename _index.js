'use strict'

////////// executable

  // let m = require('..')
  //   , test = m.test
  //   , context = m.context
  
  // test.apply(null, files.map(toContext))
  
  // function toContext(file, i, files){
  //   return context(file, require(file))  
  // }

//////////



let m = {
  inject: function(args...){
    console.log('-- args', args)
  }
}

let nodes = []
  , options = {}

function node(/* description, fn*/) {
  // console.log('[node.push]', Array.from(arguments))
  nodes.push(arguments)
}

node('filename.js', function(){ // wrapped file example

  node('description lipsum', ['expect.js', function (expect){
    // it('shouldnt throw an error', function(){
    // })
  }])

  node('description lipsum', function (){
    // it('shouldnt throw an error', function(){
    // })
  })

})

;(function next(contexts, options, tick){
  
  if (!suite.length)
    return

  const opts = Object.assign({}, options)
      , suite = contexts.slice(tick, )

  try { // @: this[offset] = {'0': desc, '1': fn}
    const desc = suite[0]
        , fn = m.inject()
    console.log(desc, fn.length)

    // next.call(this, offset +1, length -1)
  }catch(e){

  }

  function wrap(){
    return () => { 
      next(contexts, options, 1 + tick)
    }
  }
}.bind(m)).apply(m, [contexts, options])

;(function wait(){
  setTimeout(wait, 1000)
})()