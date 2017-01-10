const context = []

exports.test = (...args) => context.push(args)

process.once('beforeExit', function () {
  context.forEach(([label, fn]) => {
    const next = rendererFor(label)
    try {
      fn(next)
      if (fn.length === 0) next(null)
    } catch (err) {
      next(err)
    }
  })
})

function rendererFor (label) {
  const {success, error} = handlerFor(label)
  return (err) => {
    return err ? error(err) : success()
  }
}

function handlerFor (label) {
  const {elapsed} = timerFor(label)
  return {
    success () {
      console.log('\x1b[32m✔\x1b[0m %s (%dms)', label, elapsed())
    },
    error (err) {
      console.log('\x1b[31m✘\x1b[0m %s (%dms)', label, elapsed())
      console.error(err)
      process.exitCode = 1
    }
  }
}

function timerFor (label) {
  const timestamp = Date.now()
  return {
    elapsed () {
      return Date.now() - timestamp
    }
  }
}
