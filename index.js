const queue = []

process.once('beforeExit', next)

exports.test = (label, fn) => {
  push({fn, next: doneFor(label)})
}

function push (item) {
  queue.push(item)
}

function next () {
  if (queue.length === 0) return
  const {fn, next} = queue.shift()
  try {
    fn(next)
    if (fn.length === 0) next(null)
  } catch (err) {
    next(err)
  }
}

function doneFor (label) {
  const {elapsed} = timerFor(label)
  return err => {
    if (err) {
      process.exitCode = 1
      console.log('\x1b[31m✘\x1b[0m %s (%dms)', label, elapsed())
      if (err.name === 'TypeError') {
        console.error(err)
      } else {
        console.error('  %s : %s', err.name, err.message)
      }
    } else {
      console.log('\x1b[32m✔\x1b[0m %s (%dms)', label, elapsed())
    }
    next()
  }
}

function timerFor (label, initial = Date.now()) {
  return {
    elapsed () {
      return Date.now() - initial
    }
  }
}
