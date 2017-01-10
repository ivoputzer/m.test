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
      console.error('\x1b[31m✘\x1b[0m: %s (%dms)', label, elapsed)
      if (err.name === 'TypeError') {
        console.error(err)
      } else {
        console.error('  %s : %s', err.name, err.message)
      }
      process.exitCode = 1
    } else {
      console.log('\x1b[32m✔\x1b[0m: %s (%dms)', label, elapsed)
    }
  }
}
