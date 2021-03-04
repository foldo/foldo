import { mkdir } from 'mk-dirs/sync'
import path from 'path'
import fs from 'fs'
import { promisify } from 'util'

const writeFileAsync = promisify(fs.writeFile)
const readFileAsync = promisify(fs.readFile)

export async function readFile(p, encoding='utf8'){
  return await readFileAsync(cwdify(p), encoding)
}

export async function writeFile(p, data){
  // only if data is truthy
  if(data){
    // ensure dir exists
    mkdir(path.dirname(p))
    await writeFileAsync(p, data)
  }
}