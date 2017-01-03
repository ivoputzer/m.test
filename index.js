const context = []

exports.test = (...args) => context.push(args)

process.once('beforeExit', function () {
  context.forEach(([label, fn]) => {
    const next = rendererFor(label)
    try {
      fn(next)
    } catch (err) {
      next(err)
    }
  })
})

function rendererFor (label) {
  return err => {
    if (err) {
      console.error('✘', label)
      // process.exitCode = 1
    } else {
      console.log('✔', label)
    }
  }
}
