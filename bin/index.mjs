#!/usr/bin/env node
import { argv } from 'node:process'
import { realpath } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { spawn } from 'node:child_process'
import { find } from '../lib/index.mjs'

try {
  const require = join(dirname(dirname(await realpath(argv[1]))), 'global.js')
  for await (const path of find('test')) {
    await exec(['--require', require, path])
  }
} catch (error) {
  console.error(error)
}

function exec (args) {
  return new Promise ((resolve, reject) => {
    spawn('node', args, { stdio: 'inherit' })
      .on('error', reject)
      .on('close', exit => {
        if (exit === 1) process.exit(1)
        resolve(exit)
      })
  })
}

// this should be able to replace
// basic functionality of current binary
// all flag configurations are not supported yet
// only test folder $cwd/test

// we need to find a way to add:
// - [ ] exit code if one of the underlying fails
// - [ ] watch feature
// - [ ] parallel execution
// - [ ] coverage
// - [ ] debug
