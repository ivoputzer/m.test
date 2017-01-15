[
  'magenta',
  'yellow',
  'green',
  'blue',
  'cyan',
  'red'
].forEach(function (color) {
  const colored = '\u001b[#m'
  String.prototype.__defineGetter__(color, function () {
    const options = {cyan: 6, magenta: 5, blue: 4, yellow: 3, green: 2, red: 1, reset: 0}
    return colored.replace(/#/, '3' + options[color]) +
           this +
           colored.replace(/#/, 0)
  })
})
