import { join, resolve } from 'node:path'
import { readdir } from 'node:fs/promises'

export async function* find (path) {
  for (const item of await readdir(path, { withFileTypes: true })) {
    const fileOrDirectory = resolve(path, item.name)
    if (item.isDirectory()){
      yield* find(fileOrDirectory)
    } else {
      yield fileOrDirectory
    }
  }
}
