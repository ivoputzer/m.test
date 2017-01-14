exports.test = (label, fn) => push({label, fn})

process.once('beforeExit', next)

const queue = []

function push () {
  queue.push(...arguments)
}

function next (err) {
  if (err || queue.length === 0) return err
  const {fn, done} = shift(queue)
  try {
    queue.length = 0
    fn(done)
    if (fn.length === 0) done(null)
  } catch (err) {
    done(err)
  }
}

function shift ([context, ...pending]) {
  const {elapsed} = timerFor(context)
  return {
    done (err) {
      const indent = indentFor(context)
      if (queue.length > 0) { // context
        console.log('%s%s', indent, context.label)
      } else { // test
        if (err) {
          process.exitCode = 1
          console.log('%s\x1b[31m✘\x1b[0m %s (%dms)', indent, context.label, elapsed())
          if (err.name) {
            console.log('  %s\x1b[31m%s\x1b[0m', indent, err.name, err.message)
          } else {
            console.log('  %s%s', indent, err)
          }
        } else {
          console.log('%s\x1b[32m✔\x1b[0m %s (%dms)', indent, context.label, elapsed())
        }
      }
      queue.forEach(bindTo(context))
      push(...pending)
      next(err)
    },
    fn: context.fn
  }
}

function indentFor (context, length = 0) {
  if (context.parent === undefined) {
    return Array.from({length}).fill('  ').join('')
  }
  return indentFor(context.parent, ++length)
}

function bindTo (parent, {assign} = Object) {
  return (context) => assign(context, {parent})
}

function timerFor (context, initial = Date.now()) {
  return {
    elapsed () {
      return Date.now() - initial
    }
  }
}
