const queue = []
let current = null

// final api
// exports.m = require(`../package.json`)
// exports.test =
// exports.push =
// exports.it =
// exports.describe =
// exports.context =
// exports.m.test = (label, fn) => queue.push({label, fn})

const push = (label, fn) => {
  queue.push({label, fn})
}

process.once('beforeExit', next)

function next () {
  if (queue.length === 0) return
  const {label, fn} = queue.shift()
  const pending = queue.length
  const done = doneFor({pending})
  try {
    // const context = {}
    fn(done)
    if (fn.length === 0) done(null)
  } catch (err) {
    done(err)
  }

  function doneFor ({pending}) {
    return function (err) {
      if (queue.length - pending > 0) {
        queue.unshift(...queue.splice(pending - queue.length))
      }
      const symbol = err ? '✘' : '✔'
      console.log('[%s] %s', symbol, label)
      next()
    }
  }
}

const {ok} = require('assert')

push('label 0', function () {
  push('label 0.1', function () {
    ok(true)
  })
  push('label 0.2', function () {
    ok(false)
  })
})

push('label async 1', function () {
  push('label async 1.1', function (done) {
    setTimeout(() => {
      ok(true)
      done()
    }, 100)
  })
  push('label async 1.2', function (done) {
    setTimeout(() => {
      try {
        ok(false)
      } catch (err) {
        done(err)
      }
    }, 100)
  })
})

push('label 2', function () {
  push('label 2.1', function () {
    ok(true)
  })
  push('label 2.2', function () {
    ok(false)
  })
})
