import { generateBuilder } from './builder'
import { scan, watch } from 'watches'
import { writeFile, printer, sanitize } from './utils'

// ignore . or _ prefixed folders or files
let watches_options = {
  cache: require.cache,
  ignore: /(^|[\/\\])[\._]./, // ignore _ & . prefixed files/folders
} 

async function write(obj){
  let keys = Object.keys(obj)
  await Promise.all(keys.map(p => writeFile(p, obj[p])))
  printer.success(`Built ${keys.length} files`)
}

export async function build(config){
  config = sanitize(config)
  let start = Date.now()
  let output = {}
  await Promise.all(
    Object.keys(config).map(async k => {
      let builder = generateBuilder(k, config[k])
      let all = scan(k, watches_options)
      let new_builds = await builder(all)
      Object.assign(output, new_builds)
    })
  )
  await write(output);
  printer.success(`Built in ${Date.now() - start}ms`)
}

export function dev(config={}){
  config = sanitize(config)

  for(let k in config){
    let builder = generateBuilder(k, config[k])

    watch(k,watches_options)
      .on('ready', async (all) => {
        let output = await builder(all)
        await write(output);
      })
      .on('change', async (changed, all) => {
        let singles = await builder.single(changed)
        let aggregates = await builder.aggregate(all)
        let output = Object.assign(singles, aggregates)
        await write(output);
      })
      .on('remove', async (p) => {
        printer.warn(p)
      })
      .on('error', printer.error)
  
  }

}