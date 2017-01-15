# m.test
[![Travis](https://img.shields.io/travis/ivoputzer/m.test.svg?style=flat-square)](https://travis-ci.org/ivoputzer/m.test) [![node](https://img.shields.io/node/v/m.test.svg?style=flat-square)](https://nodejs.org/docs/v6.0.0/api) [![npm](https://img.shields.io/npm/v/m.test.svg?style=flat-square)](https://www.npmjs.com/package/m.test) [![npm](https://img.shields.io/npm/l/m.test.svg?style=flat-square)](https://spdx.org/licenses/MIT)
[![js-standard-style](https://img.shields.io/badge/standard-javascript-yellow.svg?style=flat-square)](http://standardjs.com/)


`wip` test runner from the m.icro series.

#### install

install [m.test](https://github.com/ivoputzer/m.test) directly from [npm](https://www.npmjs.com) to project's [devDependencies](https://docs.npmjs.com/files/package.json#devdependencies).

```sh
npm install --development m.test
```

#### usage

test files are run by simply passing them to [node](https://nodejs.org). for a given `test/index.js` run the following to execute the suite:

```sh
node test
```

#### cli

more utilities to run your suites are available through the cli. if no files are given they will be looked up from `cwd `'s `test` folder recursively.

```sh
m.test [options] [files]
```

further instructions can be accessed via `--help` flag and [man-pages](https://github.com/ivoputzer/m.test/tree/master/man) by executing either `m.test --help` or `man m.test` within your shell.

---

#### sync usage
```javascript
const {ok} = require('assert')
const {test} = require('m.test')

test('description', function () {
  ok(true)
})
```

#### async usage
```javascript
test('description', function (done) {
  setTimeout(function (done) {
    done(null)
  }, 0, done)  
})
```

#### recursive usage
```javascript
const {test: describe, test: it} = require('m.test')

describe('context', function(){
  it('works!', function (done) {
    setTimeout(() => done(null), 0)  
  })
})
```

[view more](https://github.com/ivoputzer/m.test/tree/master/test)
