const queue = []

exports.test = (label, fn) => queue.push({label, fn, parent: null})
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
}

function nextTickFor (context, pending) {
  const length = pending.length
  const {elapsed} = timerFor(context.label)

  return function tick (err) {
    let indent = Array(countParents(context)).fill('  ').join('')
    if (pending.length > length) {
      pending.unshift(...pending.splice(length).map(bindParent(context)))
      console.log('%s%s', indent, context.label)
    } else {
      if (err) {
        process.exitCode = 1
        console.log('%s\x1b[31m✘\x1b[0m %s (%dms)', indent, context.label, elapsed())
        console.error(err)
      } else {
        console.log('%s\x1b[32m✔\x1b[0m %s (%dms)', indent, context.label, elapsed())
      }
    }
    next(err)
    function bindParent (parent, {assign} = Object) {
      return (context) => assign(context, {parent})
    }
  }
}

function countParents (context, count = 0) {
  if (context.parent === null) return count
  return countParents(context.parent, ++count)
}

function timerFor (label, initial = Date.now()) {
  return {
    elapsed () {
      return Date.now() - initial
    }
  }
}
