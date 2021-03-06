import path from 'path'
import { mergeObj } from './objHelpers';
import { printer } from '../printer'

function flatten(arr, d = Infinity) {
  return d > 0 ? arr.reduce((acc, val) => acc.concat(Array.isArray(val) ? flatDeep(val, d - 1) : val), [])
               : arr.slice();
};

function isValidBuilder(b){
  if(b && typeof b === 'object'){
    let { single, aggregate } = b;
    return (single && typeof single === 'function') || (aggregate && typeof aggregate === 'object')
  }
}


export function sanitize(config){
  let result = {}
  // ensure config is either an object or an array
  if(!config || (typeof config != 'object' && !Array.isArray(config))){
    printer.error('Config must be an object or an array')
  }
  // force config into a flattened array
  config = flatten(Array.isArray(config) ? config : [config])
  // ensure each item in config array is a valid { [input]: builder } object
  config = config.filter(item => {
    if(item && typeof item === 'object'){
      let flag = true
      for(let k in item){
        flag = flag && isValidBuilder(item[k])
      }
      return flag
    }
  })
  // merge config array into a single object
  result = mergeObj(config)
  return result;
}