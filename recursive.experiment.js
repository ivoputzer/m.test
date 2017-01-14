const queue = []
const push = (label, fn) => queue.push({label, fn, parent: null})

process.once('beforeExit', next)

function next (err) {
  if (queue.length === 0) return err
  const context = queue.shift()
  const tick = nextTickFor(context, queue)
  try {
    context.fn(tick)
    if (context.fn.length === 0) tick(null)
  } catch (err) {
    tick(err)
  }

  function nextTickFor (context, pending) {
    const length = pending.length
    return function tick (err) {
      let indent = Array(countParents(context)).fill('  ').join('')
      if (pending.length > length) { // is context
        pending.unshift(...pending.splice(length).map((c) => Object.assign(c, {parent: context})))
        console.log('%s%s', indent, context.label)
      } else { // is context
        console.log('%s%s %s', indent, err ? '✘' : '✔', context.label)
      }
      // console.dir(queue)
      // queue.push(...pending)
      next(err)
    }
    function countParents (context, count = 0) {
      if (context.parent === null) return count
      return countParents(context.parent, ++count)
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
