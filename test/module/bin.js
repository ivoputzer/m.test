const {ok} = require('assert')
const {lstatSync, constants: {X_OK}} = require('fs')

test('module/bin', function () {
  test('package binaries contain `m.test`', function () {
    ok(process.env['npm_package_bin_m_test'])
  })
  test('package binaries are executable', function () {
    packageBinariesFor(process).forEach(path => {
      ok(lstatSync(path).mode & X_OK)
    })
  })

  function packageBinariesFor ({env}, {keys} = Object) {
    return keys(env).reduce((paths, bin) => {
      return /npm_package_bin_/ig.test(bin)
          ? [env[bin], ...paths]
          : paths
    }, [])
  }
})
