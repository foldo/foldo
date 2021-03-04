#!/usr/bin/env node

require = require("esm")(module);
const sade = require('sade');
const pkg = require('./package.json');
const path = require('path');
const { build, dev } = require('./dist/index.js');
const { watch } = require('watches')

const cli = sade('foldo')

function parseConfig(path_to_config){
  let config
  try{
    config = require(path.join(process.cwd(), path_to_config))
  } catch(e){
    console.log('Error loading config file: ' + path_to_config)
  }
  if(config && config.default && typeof config.default === 'object'){
    return config.default;
  }
  console.log('Error loading config file: ' + path_to_config)
  return {}
}



cli
  .version(pkg.version)
  .describe(pkg.description)
  .option('-c, --config', 'Path to config file', 'foldo.js')

cli
  .command('build')
  .describe('Build the project for production')
  .action(({ c }) => {
    build(parseConfig(c))
  })

cli
  .command('dev')
  .describe('Build the project and watch for changes')
  .action(({ c }) => {
    dev(parseConfig(c))
    watch('foldo.js', { cache: require.cache })
      .on('change', async (changed) => {
        console.log('Config file changed, please restart foldo')
      })
  })


cli.parse(process.argv);
