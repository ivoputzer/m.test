const context = []

exports.test = (...args) => context.push(args)

process.on('beforeExit', function () {
  console.time('\nelapsed')
  context.forEach(([label, fn]) => {
    try {
      fn()
      done(label, null)
    } catch (err) {
      done(label, err)
    }
  })
  console.timeEnd('\nelapsed')
})

function done (label, err) {
  if (err) {
    console.error('✘', label)
    // process.exitCode = 1
  } else {
    console.log('✔', label)
  }
}
