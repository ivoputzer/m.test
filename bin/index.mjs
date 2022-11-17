#!/usr/bin/env node
import process from 'node:process'
import { realpath } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { spawn } from 'node:child_process'
import { find } from '../lib/index.mjs'

console.log('-- test')

try {
  const require = join(dirname(dirname(await realpath(process.argv[1]))), 'global.js')
  const files = find('test')
  const codes = []
  const children = []

  process.on('beforeExit', (code) => {
    children.forEach((child) => child.kill())
    if (codes.some(value => value > 0)) {
      process.exit(1)
    }
  })

  for await (const path of files) {
    children.push(
      spawn('node', ['--require', require, path], { stdio: 'inherit' })
        .on('close', code => codes.push(code))
    )
  }
} catch (error) {
  console.error(error)
}

// we need to find a way to add:
// - [ ] watch feature
// - [ ] parallel execution
// - [ ] coverage
// - [ ] debug
