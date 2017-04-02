# cli

--no-ansi flag


in order to remove ansi escape codes from a given test suite. you might wanna use `m.noansi` to


```sh
npm i -g m.test m.noansi
m.test path/to/test/dir | m.noansi
```

  if (/--no-ansi/i.test(flag)) {
    console.info('--no-ansi')
    const ansiChar = /[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-PRZcf-nqry=><]/g
    process.stdout.write = (function (write) {
      return (buffer, ...args) => write.call(process.stdout, buffer.toString('utf8').replace(ansiChar, String.prototype), ...args)
    })(process.stdout.write)
  }
