#!/usr/bin/env node

const {join, dirname, resolve} = require('path')
const {realpathSync, readFileSync, watch, existsSync, statSync, readdirSync} = require('fs')

if (['-h', '--help'].some(flag => process.argv.includes(flag))) {
  const path = join(dirname(dirname(realpathSync(process.argv[1]))), 'man', 'm.test.1')
  const info = readFileSync(path)
              .toString('utf8')
              .split('\n')
              .slice(9, -2)
              .join('\n')
              .replace('SYNOPSIS', '  Usage:')
              .replace('OPTIONS', '  Options:')
  process.stdout.write(`\n${info}\n`)
  process.exit(0)
}

if (['-v', '--version'].some(flag => process.argv.includes(flag))) {
  const path = join(dirname(dirname(realpathSync(process.argv[1]))), 'package.json')
  const info = JSON.parse(readFileSync(path))
  process.stdout.write(`${info.version}\n`)
  process.exit(0)
}

const cluster = require('cluster')
const queue = []
const execArgv = process.argv.slice(2).reduce(flag => {
  // remove all the flags that m.test does understand
  // -watch
  // -parallel
  // -filter
  // -ignore
  // files and directories
})
// LOCAL 'node_modules/m.test/global.js'
// GLOBAL '/usr/local/lib/node_modules/m.test/global.js'
// ['--require', join(base, )].push(process.execArgv, execArgv)
cluster.on('online', function (worker) {
  worker.disconnect()
})
;(function notify (process, cluster) {
  const args = process.argv.slice(2)
  const base = dirname(dirname(realpathSync(process.argv[1])))
  const stdio = ['inherit', 'inherit', 'inherit', 'ipc']
  const execArgv = ['--require', join(base, 'global')]
  if (args.length === 0) {
    if (['test', 'test.js'].some(path => existsSync(path))) {
      args.push('test')
    } else {
      process.stderr.write(`no tests to run.`)
      process.exit(0)
    }
  }
  while (args.length > 0) {
    const flag = args.shift()
    if (/-w|--watch/i.test(flag)) {
      // watch(cwd(), {recursive: true}, () => notify({argv: argv.filter(flag => !/-w|--watch/i.test(flag)), cwd}, cluster))
      continue
    }
    if (/-r|--require/i.test(flag)) {
      execArgv.push('--require', join(base, 'global'))
      continue
    }
    if (/^-|^--/i.test(flag)) {
      execArgv.push(flag)
      continue
    }
    try {
      const stats = statSync(flag)
      if (stats.isDirectory()) {
        readdirSync(flag).map(file => resolve(flag, file)).forEach(path => args.push)
        continue
      }
      cluster.setupMaster({execArgv, args: [], exec: join(process.cwd(), flag), stdio})
      cluster.fork()
    } catch (e) {
      execArgv.push(flag)
    }
  }
})(process, cluster)
// if (process.argv.slice(2).some('--watch'))

// function* nextTest ({argv, stdout, exit, execArgv}) {
//   const {join, dirname} = require('path')
//   const {realpathSync, readFileSync} = require('fs')
//   }
//   if (argv.slice(2).some(flag => /-w|--watch/i.test(flag))) {
//     console.log('enable watch')
//   }
//   // if (/-p|--parallel/i.test(argv[2])) {
//   // }
//   // while (argv.length > 2) {
//   //   const [path] = argv.splice(2, 1)
//   //   if (existsSync(path)) {

//   //   } else {
//   //     execArgv.push(path)
//   //   }
//   // }
// }

// // // read argv
// // // filter out all known flags
// // // push argv to execArgv
// // const base = dirname(dirname(realpathSync(process.argv[1])))
// // const exec = []
// // // falls back to `test.js`, `test/index.js`
// // // if (process.argv.length === 2) process.argv.push('test')
// // while (process.argv.length > 2) {
// //   const flag = process.argv.splice(2, 1)

// //   if (/-h|--help/i.test(flag)) {
// //     const path = join(base, 'man', 'm.test.1')
// //     const info = readFileSync(path)
// //                 .toString('utf8')
// //                 .split('\n')
// //                 .slice(9, -2)
// //                 .join('\n')
// //                 .replace('SYNOPSIS', '  Usage:')
// //                 .replace('OPTIONS', '  Options:')
// //     process.stdout.write(`\n${info}\n`)
// //     process.exit(0)
// //   }
// //   const path = join(process.cwd(), ...flag)
// //   if (existsSync(path)) {
// //     exec.push(path)
// //   } else {
// //     process.execArgv.push(...flag)
// //   }
// // }
// // process.argv.length = 2

// // {
// //   base: //
// //   exec: // next file for suite
// //   execArgv: // everything that hanst been matched
// //   args: // argv
// // }


// // process.execArgv.push('--require', join(base, 'global'))

// // require('cluster').on('online', (worker) => {
// //   console.log('-- worker(%d) online -> disconnect', worker.id)
// //   worker.disconnect()
// // })



// // } while (process.argv.length > 2)

// // // do {
// // //   const flag = args.shift()

// // //   // if (/-v|--version/i.test(flag)) {
// // //   //   const path = join(base, 'package.json')
// // //   //   const info = JSON.parse(readFileSync(path))
// // //   //   process.stdout.write(info.version)
// // //   //   process.exit(0)
// // //   // }
// // //   // if (/-p|--parallel/i.test(flag)) {
// // //   //   console.info('--parallel', args.shift())
// // //   // }
// // //   // if (/-w|--watch/i.test(flag)) {
// // //   //   require('fs').watch(cwd(), {recursive: true, env}, (type, filename) => {})
// // //   // }
// // //   // files.push(flag)
// // // } while (args.length > 0)

// // // console.log('-- argv', args)
// // // console.log('-- options', options)

// //   // .filter(flag => !/^-|^--/.test(flag))
// //   // .forEach(function lookup (dir) {
// //   //   stat(dir, (err, stats) => {
// //   //     if (err) throw err
// //   //     if (stats.isDirectory()) {
// //   //       readdir(dir, {encoding}, (err, files) => {
// //   //         if (err) throw err
// //   //         files.forEach(file => lookup(resolve(dir, file)))
// //   //       })
// //   //     } else {
// //   //       notify('lookup', dir)
// //   //     }
// //   //   })
// //   // })

// // // const cluster = require('cluster')

// // // // cluster.on('disconnect', (worker) => console.log('-- event:disconnect(%d)', worker.id))
// // // // cluster.on('exit', (worker, code, signal) => console.log('-- event:exit(%d)', worker.id, code, signal))
// // // // cluster.on('fork', (worker) => console.log('-- event:fork(%d)', worker.id))
// // // // cluster.on('listening', (worker, address) => console.log('-- event:listening(%d)', worker.id))
// // // // cluster.on('message', (worker, message, handle) => console.log('-- event:online(%d)', worker.id))
// // // // cluster.on('online', (worker) => console.log('-- event:online(%d)', worker.id))
// // // // cluster.on('setup', (settings) => console.log('-- event:setup', settings))

// // function execArgsFrom () {
// //   // remove args implemented by m.test
// //   // remove files and directories
// // }

// // function* execFrom () {

// // }
