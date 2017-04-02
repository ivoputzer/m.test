#!/usr/bin/env node

const {async} = require('../lib/m.async')

const cluster = require('cluster')
// parse exit args
// parse parallel then start queue

const queue = async(function scodatore (settings, next) {
  cluster.setupMaster(settings)
  const worker = cluster.fork()
  worker.on('online', () => worker.disconnect())
  worker.on('exit', () => worker.exitedAfterDisconnect === true && next())
}, 2)
// parse filter, ignore
;(function notify ({argv, cwd}, queue) {
  const {join} = require('path')

  const args = argv.slice(2)
  const base = baseFrom(argv)
  const execArgv = ['--require', join(base, 'global.js')]
  // -h|--help
  // -w|--watch
  // -p|--parallel
  // --debug
  // --inspect
  while (args.length > 0) {
    // config args parsing
    queue.push([{
      args: [],
      stdio: ['inherit', 'inherit', 'inherit', 'ipc'],
      exec: join(cwd(), args.shift()),
      execArgv
    }])
  }
  // const base = dirname(dirname(realpathSync(process.argv[1])))
  // const execArgv = ['--require', join(base, 'global')]
  // if (args.length === 0) {
  //   if (['test', 'test.js'].some(path => existsSync(path))) {
  //     args.push('test')
  //   } else {
  //     process.stderr.write(`no tests to run.`)
  //     process.exit(0)
  //   }
  // }
  // while (args.length > 0) {
  //   const flag = args.shift()
  //   if (/-w|--watch/i.test(flag)) {
  //     // watch(cwd(), {recursive: true}, () => notify({argv: argv.filter(flag => !/-w|--watch/i.test(flag)), cwd}, cluster))
  //     continue
  //   }
  //   if (/-r|--require/i.test(flag)) {
  //     execArgv.push('--require', join(base, 'global'))
  //     continue
  //   }
  //   if (/^-|^--/i.test(flag)) {
  //     execArgv.push(flag)
  //     continue
  //   }
  //   try {
  //     const stats = statSync(flag)
  //     if (stats.isDirectory()) {
  //       readdirSync(flag).map(file => resolve(flag, file)).forEach(path => args.push)
  //       continue
  //     }
  //     cluster.setupMaster({execArgv, args: [], exec: join(process.cwd(), flag), stdio})
  //     cluster.fork()
  //   } catch (e) {
  //     execArgv.push(flag)
  //   }
  // }
  function baseFrom (argv) {
    const {realpathSync} = require('fs')
    const {dirname} = require('path')
    return dirname(dirname(realpathSync(argv[1])))
  }
})(process, queue)
