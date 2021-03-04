'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var path = require('path');
var fs$1 = require('fs');
var util = require('util');
var watches = require('watches');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var path__default = /*#__PURE__*/_interopDefaultLegacy(path);
var fs__default = /*#__PURE__*/_interopDefaultLegacy(fs$1);

async function resolveObj(obj={}){
  let promises = [];
  let keys = [];
  for(let k in obj){
    keys.push(k);
    promises.push(obj[k]);
  }
  let values = await Promise.all(promises);
  return values.reduce((o,v,i) => Object.assign(o, { [keys[i]]: v }), {})
}

function mergeObj(arr=[]){
  return Object.assign.apply(null, [{}, ...arr])
}

function cwdifyObj(o){
  let out = {};
  for(let k in o){
    out[path__default['default'].join(process.cwd(), k)] = o[k];
  }
  return out;
}

let FORCE_COLOR, NODE_DISABLE_COLORS, NO_COLOR, TERM, isTTY=true;
if (typeof process !== 'undefined') {
	({ FORCE_COLOR, NODE_DISABLE_COLORS, NO_COLOR, TERM } = process.env);
	isTTY = process.stdout && process.stdout.isTTY;
}

const $ = {
	enabled: !NODE_DISABLE_COLORS && NO_COLOR == null && TERM !== 'dumb' && (
		FORCE_COLOR != null && FORCE_COLOR !== '0' || isTTY
	),

	// modifiers
	reset: init(0, 0),
	bold: init(1, 22),
	dim: init(2, 22),
	italic: init(3, 23),
	underline: init(4, 24),
	inverse: init(7, 27),
	hidden: init(8, 28),
	strikethrough: init(9, 29),

	// colors
	black: init(30, 39),
	red: init(31, 39),
	green: init(32, 39),
	yellow: init(33, 39),
	blue: init(34, 39),
	magenta: init(35, 39),
	cyan: init(36, 39),
	white: init(37, 39),
	gray: init(90, 39),
	grey: init(90, 39),

	// background colors
	bgBlack: init(40, 49),
	bgRed: init(41, 49),
	bgGreen: init(42, 49),
	bgYellow: init(43, 49),
	bgBlue: init(44, 49),
	bgMagenta: init(45, 49),
	bgCyan: init(46, 49),
	bgWhite: init(47, 49)
};

function run(arr, str) {
	let i=0, tmp, beg='', end='';
	for (; i < arr.length; i++) {
		tmp = arr[i];
		beg += tmp.open;
		end += tmp.close;
		if (!!~str.indexOf(tmp.close)) {
			str = str.replace(tmp.rgx, tmp.close + tmp.open);
		}
	}
	return beg + str + end;
}

function chain(has, keys) {
	let ctx = { has, keys };

	ctx.reset = $.reset.bind(ctx);
	ctx.bold = $.bold.bind(ctx);
	ctx.dim = $.dim.bind(ctx);
	ctx.italic = $.italic.bind(ctx);
	ctx.underline = $.underline.bind(ctx);
	ctx.inverse = $.inverse.bind(ctx);
	ctx.hidden = $.hidden.bind(ctx);
	ctx.strikethrough = $.strikethrough.bind(ctx);

	ctx.black = $.black.bind(ctx);
	ctx.red = $.red.bind(ctx);
	ctx.green = $.green.bind(ctx);
	ctx.yellow = $.yellow.bind(ctx);
	ctx.blue = $.blue.bind(ctx);
	ctx.magenta = $.magenta.bind(ctx);
	ctx.cyan = $.cyan.bind(ctx);
	ctx.white = $.white.bind(ctx);
	ctx.gray = $.gray.bind(ctx);
	ctx.grey = $.grey.bind(ctx);

	ctx.bgBlack = $.bgBlack.bind(ctx);
	ctx.bgRed = $.bgRed.bind(ctx);
	ctx.bgGreen = $.bgGreen.bind(ctx);
	ctx.bgYellow = $.bgYellow.bind(ctx);
	ctx.bgBlue = $.bgBlue.bind(ctx);
	ctx.bgMagenta = $.bgMagenta.bind(ctx);
	ctx.bgCyan = $.bgCyan.bind(ctx);
	ctx.bgWhite = $.bgWhite.bind(ctx);

	return ctx;
}

function init(open, close) {
	let blk = {
		open: `\x1b[${open}m`,
		close: `\x1b[${close}m`,
		rgx: new RegExp(`\\x1b\\[${close}m`, 'g')
	};
	return function (txt) {
		if (this !== void 0 && this.has !== void 0) {
			!!~this.has.indexOf(open) || (this.has.push(open),this.keys.push(blk));
			return txt === void 0 ? this : $.enabled ? run(this.keys, txt+'') : txt+'';
		}
		return txt === void 0 ? chain([open], [blk]) : $.enabled ? run([blk], txt+'') : txt+'';
	};
}

let { bold, dim } = $;
let { log } = console;

let printer = {
  warn(message){
    log(`${$['yellow'](`◸!◿`)} ${dim(':')} ${message}`);
  },
  error(message, e){
    log(`${$['red'](`◸x◿`)} ${dim(':')} ${message}`);
  },
  success(message){
    log(`${$['green'](`◸✓◿`)} ${dim(':')} ${message}`);
  },
  info(message){
    log(`${$['blue'](`◸/◿`)} ${dim(':')} ${message}`);
  }
};

function flatten(arr, d = Infinity) {
  return d > 0 ? arr.reduce((acc, val) => acc.concat(Array.isArray(val) ? flatDeep(val, d - 1) : val), [])
               : arr.slice();
}
function isValidBuilder(b){
  if(b && typeof b === 'object'){
    let { single, aggregate } = b;
    return (single && typeof single === 'function') || (aggregate && typeof aggregate === 'object')
  }
}


function sanitize(config){
  let result = {};
  // ensure config is either an object or an array
  if(!config || (typeof config != 'object' && !Array.isArray(config))){
    printer.error('Config must be an object or an array');
  }
  // force config into a flattened array
  config = flatten(Array.isArray(config) ? config : [config]);
  // ensure each item in config array is a valid { [input]: builder } object
  config = config.filter(item => {
    if(item && typeof item === 'object'){
      let flag = true;
      for(let k in item){
        flag = flag && isValidBuilder(item[k]);
      }
      return flag
    }
  });
  // merge config array into a single object
  result = mergeObj(config);
  return result;
}

function throws(code, msg, path) {
	let err = new Error(code + ': ' + msg);
	err.code=code; err.path=path;
	throw err;
}

function mkdir(str, opts={}) {
	if (process.platform === 'win32' && /[<>:"|?*]/.test(str.replace(path.parse(str).root, ''))) {
		throws('EINVAL', 'invalid characters', str);
	}

	let cwd = path.resolve(opts.cwd || '.');
	let seg, mode = opts.mode || 0o777 & (~process.umask());
	let arr = path.resolve(cwd, path.normalize(str)).replace(cwd, '').split(/\/|\\/);

	for (seg of arr) {
		cwd = path.join(cwd, seg);
		if (fs$1.existsSync(cwd)) {
			if (!fs$1.statSync(cwd).isDirectory()) {
				throws('ENOTDIR', 'not a directory', cwd);
			}
		} else {
			fs$1.mkdirSync(cwd, mode);
		}
	}

	return cwd;
}

const writeFileAsync = util.promisify(fs__default['default'].writeFile);
util.promisify(fs__default['default'].readFile);

async function writeFile(p, data){
  // only if data is truthy
  if(data){
    // ensure dir exists
    mkdir(path__default['default'].dirname(p));
    await writeFileAsync(p, data);
  }
}

function generateBuilder(input="", builds){

  builds = Array.isArray(builds) ? builds : [builds];
  let singles = [];
  let aggregates = {};
  builds.forEach(({ single, aggregate }) => {
    if(single && typeof single === 'function'){
      singles.push(single);
    }
    if(aggregate && typeof aggregate === 'object'){
      Object.assign(aggregates, aggregate);
    }
  });

  let file_info = (x) => {
    let info = {};
    if(typeof x === 'string'){
      delete require.cache[x];
      info = {
        p: x,
        contents: fs.readFileSync(x),
        module: require(x)
      };
    } else {
      info = x;
    }
    info.id = path__default['default'].normalize(info.p.replace(process.cwd(),'').replace(input, ''));
    info.id = info.id.substr(0,info.id.length - 3);
    return info
  };

  let single = async function(changed){
    changed = changed.map(file_info);
    let promised = {};
    changed.forEach(info => {
      let singleObj = mergeObj(singles.map(f => f(info.id)));
      for(let k in singleObj){
        promised[k] = singleObj[k](info);
      }
    });
    let result = await resolveObj(promised);
    return cwdifyObj(result)
  };

  let aggregate = async function(all){
    let promised = {};
    for(let k in aggregates){
      promised[k] = aggregates[k](all);
    }
    let result = await resolveObj(promised);
    return cwdifyObj(result)
  };

  let build = async function(all){
    let [s, a] = await Promise.all([ single(all), aggregate(all) ]);
    return Object.assign(s, a)
  };
  build.single = single;
  build.aggregate = aggregate;
  return build;
}

// ignore . or _ prefixed folders or files
let watches_options = {
  cache: require.cache,
  ignore: /(^|[\/\\])[\._]./, // ignore _ & . prefixed files/folders
}; 

async function write(obj){
  let keys = Object.keys(obj);
  await Promise.all(keys.map(p => writeFile(p, obj[p])));
  printer.success(`Built ${keys.length} files`);
}

async function build(config){
  config = sanitize(config);
  let start = Date.now();
  let output = {};
  await Promise.all(
    Object.keys(config).map(async k => {
      let builder = generateBuilder(k, config[k]);
      let all = watches.scan(k, watches_options);
      let new_builds = await builder(all);
      Object.assign(output, new_builds);
    })
  );
  await write(output);
  printer.success(`Built in ${Date.now() - start}ms`);
}

function dev(config={}){
  config = sanitize(config);

  for(let k in config){
    let builder = generateBuilder(k, config[k]);

    watches.watch(k,watches_options)
      .on('ready', async (all) => {
        let output = await builder(all);
        await write(output);
      })
      .on('change', async (changed, all) => {
        let singles = await builder.single(changed);
        let aggregates = await builder.aggregate(all);
        let output = Object.assign(singles, aggregates);
        await write(output);
      })
      .on('remove', async (p) => {
        printer.warn(p);
      })
      .on('error', printer.error);
  
  }

}

exports.build = build;
exports.dev = dev;
