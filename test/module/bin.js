const {ok} = require('assert')
const {lstatSync, constants: {X_OK} = {X_OK: 1}} = require('fs')

test('module/bin', function () {
  test('package `m.test` binary is configured!', function () {
    const bin = require('../../package').bin['m.test']
    ok(process.env['npm_package_bin_m_test'] || bin)
  })
  test('all package binaries are executable!', function () {
    binariesFor(process).forEach(path => {
      ok(lstatSync(path).mode & X_OK)
    })
  })
  function binariesFor ({env}, {keys} = Object) {
    return keys(env).reduce((paths, bin) => {
      return /npm_package_bin_/ig.test(bin) ? [env[bin], ...paths] : paths
    }, [])
  }
})
