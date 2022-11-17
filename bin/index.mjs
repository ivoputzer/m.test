#!/usr/bin/env node
import process from 'node:process'

import { spawn } from 'node:child_process'
import { realpath } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { find } from '../lib/index.mjs'

// parse args, options and stuff here
const argOptionFailFast = false
const argOptionFiles = null ?? find('test')

// run all test suites
try {
  const global = join(dirname(dirname(await realpath(process.argv[1]))), 'global.js')
  const failed = []
  for await (const path of argOptionFiles) {
    const code = await new Promise((resolve, reject) => spawn('node', ['--require', global, path], { stdio: 'inherit' }).on('close', resolve).on('error', reject))
    if (hasFailed(code)) {
      failed.push(code)
      if (argOptionFailFast) break
    }
  }
  if (failed.some(hasFailed)) {
    process.exit(1)
  }
} catch (error) {
  console.error(error)
}

function hasFailed (code) {
  return code !== 0
}
