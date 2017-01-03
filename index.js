const context = []

exports.test = (...args) => context.push(args)

process.once('beforeExit', function () {
  context.forEach(([label, fn]) => {
    try {
      fn(done.bind({label}))
    } catch (err) {
      done.call({label}, err)
    }
  })
})

function done (err) {
  if (err) {
    console.error('✘', this.label)
    // process.exitCode = 1
  } else {
    console.log('✔', this.label)
  }
}
