# m.test
[![travis](https://img.shields.io/travis/ivoputzer/m.test.svg?style=flat-square)](https://travis-ci.org/ivoputzer/m.test) [![npm-dependencies](https://img.shields.io/badge/dependencies-none-blue.svg?style=flat-square&colorB=44CC11)](package.json) [![standard-js](https://img.shields.io/badge/coding%20style-standard-brightgreen.svg?style=flat-square)](http://standardjs.com/) [![npm-package-quality](http://npm.packagequality.com/shield/m.test.svg?style=flat-square&colorB=44CC11)](http://packagequality.com/#?package=m.test) [![npm-node-version](https://img.shields.io/badge/node-6%2B-blue.svg?style=flat-square)](https://nodejs.org/docs/v6.0.0/api) [![npm-version](https://img.shields.io/npm/v/m.test.svg?style=flat-square&colorB=007EC6)](https://www.npmjs.com/package/m.test) [![npm-license](https://img.shields.io/npm/l/m.test.svg?style=flat-square&colorB=007EC6)](https://spdx.org/licenses/MIT)

**[m(icro)](https://github.com/ivoputzer/m.cro#readme)[test](https://github.com/ivoputzer/m.test)** is a lightweight test runner for [node.js](https://nodejs.org/) written in es6+ (~4kb).

#### donations
thanks for your support! [gratipay](https://gratipay.com/m.test/)

#### install

install [m.test](https://github.com/ivoputzer/m.test) directly from [npm](https://www.npmjs.com) to project's [devDependencies](https://docs.npmjs.com/files/package.json#devdependencies).

```sh
npm install --save-dev m.test
```

#### usage

test files are run by simply passing them to [node](https://nodejs.org). for a given `test/index.js` run the following command to execute the suite:

```sh
node test
```

run the following one to enable [node's debugger](https://nodejs.org/api/debugger.html):

```sh
node debug test
```

#### cli

more utilities to run your suites are available through the cli. if no files are given they will be looked up from `./test` recursively.

```sh
m.test [options] [files]
```

when executing suites through the cli `m.test` will be assigned to `global.test` by design. the following line can be omitted:

```javascript
const {test} = require('m.test')
```

further instructions can be accessed via `--help` flag and [man-pages](https://github.com/ivoputzer/m.test/tree/master/man) by executing either `m.test --help` or `man m.test` within your shell.

---

#### basic usage

```javascript
const {ok} = require('assert')

test('it just works!', function () {
  ok(true)
})
```

#### async usage

```javascript
const {ok} = require('assert')

test('it works async too!', function (done) {
  setTimeout(function () {
    ok(true)
    done()
  }, 0)
})

test('done takes a error argument!', function (done) {
  setTimeout(function (err = null) {
    done(err)
  }, 0)
})

test('runner works with Promise', function (done) {
    let promise = new Promise(function (resolve, reject) {
      setTimeout(function () {
        resolve(true)
      }, 0)
    })

    promise.then(result => {
      ok(result)
      done()
    })
  })
```

#### context usage

```javascript
test('can be used as a context', function () {
  test('works!', function (done) {
    done(null)
  })
  test('works!', function (done) {
    done(null)
  })
})
```

#### alias usage

```javascript
const {test: context, test: describe, test: it} = require('m.test')

context('given some context', function () {
  describe('your subject', function () {
    it('just works!', (done) => done(null))
  })
})
```

#### beforeEach afterEach usage

```javascript
test('description', function (done) {
  done(null)
})
beforeEach(done => setup(done))
afterEach(done => teardown(done))
```

it is important to call `beforeEach` and `afterEach` wrap functions after `test` functions themselves. when using wraps within nested suites consider their contextual binding.

```javascript
test('description 1', function () {
  test('description 1.1', Function.prototype)
  test('description 1.2', Function.prototype)
  beforeEach(done => setup(done))
  afterEach(done => teardown(done))
})
test('description 2', function () {
  test('description 2.1', Function.prototype)
  test('description 2.2', Function.prototype)
})
```
_(in the example above hooks would be called for `1.1` e `1.2`)_

---

#### skip modifier

```javascript
test.skip('description', function () {
  // this function will never be called
})
```

the [skip](#skip-modifier) modifier comes with an optional `doSkip=true` parameter that enables/disables the skip behavior according to the expression:

```javascript
test.skip('description', function () {
  // this test will be skipped when NODE_ENV=CI
}, /CI/gi.test(process.env.NODE_ENV))
```

#### timeout modifier

```javascript
test.timeout('description', function () {
  // this test will fail if it exceeds 200ms of execution
}, 200)
```

the [timeout](#timeout-modifier) modifier comes with an optional `doTimeout=true` parameter that enables/disables the timeout behavior according to the expression:

```javascript
test.timeout('description', function () {
  // this test will have a timeout when NODE_ENV=CI
}, 200, /CI/g.test(process.env.NODE_ENV))
```
[view more](https://github.com/ivoputzer/m.test/tree/master/test)
