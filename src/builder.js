import { mergeObj, resolveObj, cwdifyObj } from './utils'
import path from 'path'

export function generateBuilder(input="", builds){

  builds = Array.isArray(builds) ? builds : [builds]
  let singles = []
  let aggregates = {}
  builds.forEach(({ single, aggregate }) => {
    if(single && typeof single === 'function'){
      singles.push(single)
    }
    if(aggregate && typeof aggregate === 'object'){
      Object.assign(aggregates, aggregate)
    }
  });

  let file_info = (x) => {
    let info = {}
    if(typeof x === 'string'){
      delete require.cache[x]
      info = {
        p: x,
        contents: fs.readFileSync(x),
        module: require(x)
      }
    } else {
      info = x
    }
    info.id = path.normalize(info.p.replace(process.cwd(),'').replace(input, ''));
    return info
  }

  let single = async function(changed){
    changed = changed.map(file_info)
    let promised = {}
    changed.forEach(info => {
      let singleObj = mergeObj(singles.map(f => f(info.id)))
      for(let k in singleObj){
        promised[k] = singleObj[k](info)
      }
    })
    let result = await resolveObj(promised)
    return cwdifyObj(result)
  }

  let aggregate = async function(all){
    let promised = {}
    for(let k in aggregates){
      promised[k] = aggregates[k](all)
    }
    let result = await resolveObj(promised)
    return cwdifyObj(result)
  }

  let build = async function(all){
    let [s, a] = await Promise.all([ single(all), aggregate(all) ])
    return Object.assign(s, a)
  }
  build.single = single;
  build.aggregate = aggregate;
  return build;
}