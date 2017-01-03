# m.test
[![Travis](https://img.shields.io/travis/ivoputzer/m.test.svg?style=flat-square)]() [![node](https://img.shields.io/node/v/m.test.svg?style=flat-square)]() [![npm](https://img.shields.io/npm/v/m.test.svg?style=flat-square)]() [![npm](https://img.shields.io/npm/l/m.test.svg?style=flat-square)]()

`wip` test runner from the m.icro series

### usage

```bash
npm install --development m.test
```

```javascript
const {ok} = require('assert')
const {test} = require('m.test')

test('description', function () {
  ok(true)
})

test('description', function (done) {
  setTimeout(function (done) {
    done(null)
  }, 0, done)  
})
```

[view more](https://github.com/ivoputzer/m.test/blob/master/test/index.js)
