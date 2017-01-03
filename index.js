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
  const timestamp = Date.now()
  return err => {
    const elapsed = Date.now() - timestamp
    if (err) {
      console.error('✘ %s (%dms)', label, elapsed)
      process.exitCode = 1
    } else {
      console.log('✔ %s (%dms)', label, elapsed)
    }
  }
}
