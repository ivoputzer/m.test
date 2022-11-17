const { strictEqual } = require('assert')

test('module/npm:', function () {
  test('is available on npm!', done => {
    const name = require('../../package').name
    head({ path: process.env.npm_package_name = name, host: 'registry.npmjs.org', port: 80 }, (res) => {
      strictEqual(res.statusCode, 200)
      done()
    })
  })
  test('latest version has been deployed!', done => {
    const name = require('../../package').name
    get({ path: process.env.npm_package_name = name, host: 'registry.npmjs.org', port: 80 }, (res) => {
      strictEqual(res.statusCode, 200)
      res.pipe(toJson(({ 'dist-tags': { latest } }) => {
        strictEqual(latest, process.env.npm_package_version)
        done()
      }))
    })
  }, !process.env.DEBUG)
})

function get (options, fn, { assign } = Object) {
  return require('follow-redirects').http.request(assign(options, {
    method: 'GET',
    path: '/' + options.path.trimLeft('/')
  }), fn).end()
}

function head (options, fn, { assign } = Object) {
  return require('follow-redirects').http.request(assign(options, {
    method: 'HEAD',
    path: '/' + options.path.trimLeft('/')
  }), fn).end()
}

function toJson (fn, buffer = []) {
  return require('stream').Writable({
    write (data, encoding, next) {
      buffer.push(Buffer.from(data, encoding))
      next()
    }
  }).on('finish', ({ parse } = JSON, { concat } = Buffer) => {
    fn(parse(concat(buffer)))
  })
}
