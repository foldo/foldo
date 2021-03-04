import path from 'path'

export async function resolveObj(obj={}){
  let promises = []
  let keys = []
  for(let k in obj){
    keys.push(k)
    promises.push(obj[k])
  }
  let values = await Promise.all(promises)
  return values.reduce((o,v,i) => Object.assign(o, { [keys[i]]: v }), {})
}

export function mergeObj(arr=[]){
  return Object.assign.apply(null, [{}, ...arr])
}

export function cwdifyObj(o){
  let out = {}
  for(let k in o){
    out[path.join(process.cwd(), k)] = o[k]
  }
  return out;
}