const queue = []
const push = (label, fn) => queue.push({label, fn, indent: 0})

process.once('beforeExit', next)

function next (err) {
  if (queue.length === 0) return err
  const [current, ...pending] = queue; queue.length = 0
  const tick = nextTickFor(current, pending)
  try {
    current.fn(tick)
    if (current.fn.length === 0) tick(null)
  } catch (err) {
    tick(err)
  }
  function nextTickFor (item, pending) {
    return function tick (err) {
      if (queue.length === 0) { // is test
        console.log('[%s] %s (%d)', err ? '✘' : '✔', item.label, item.indent)
      } else { // is context
        console.log('%s (%s)', item.label, item.indent)
      }
      // console.dir(queue)
      queue.push(...pending)
      next(err)
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
push('label 3', function () {
  push('label 3.1', function () {
    push('label 3.1.1', function () {
      ok(true)
    })
    push('label 3.1.2', function () {
      ok(false)
    })
  })
})
