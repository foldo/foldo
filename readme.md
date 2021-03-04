<div align="center">
  <img src="https://github.com/foldo/foldo/raw/main/meta/foldo.png" alt="Foldo" width="60" />
</div>

<h1 align="center">foldo</h1>
<div align="center">
  <a href="https://npmjs.org/package/foldo">
    <img src="https://badgen.net/npm/v/foldo" alt="version" />
  </a>
  <a href="https://packagephobia.com/result?p=foldo">
    <img src="https://badgen.net/packagephobia/install/foldo" alt="install size" />
  </a>
</div>

<h3 align="center">folder-based build system</h3>

<p align="center">:construction: Work in progress :construction:</p>

<div align="center">
  <a href="#Usage"><b>Usage</b></a> | 
  <a href="#API"><b>API</b></a> | 
  <a href="#Examples"><b>Examples</b></a> | 
  <a href="#Details"><b>Details</b></a>
</div>

# Overview

Foldo allows you to define custom builders for each source directory in your project in a config file (`foldo.js`).
- `foldo dev` will watch source files and granularly rebuild affected outputs
- `foldo build` will build all output files

# Config

Foldo expects an object (or array of objects) where keys denote the input directory, and values are the associated builders.

Example:
```js
import { static } from '@foldo/static'
import { md_to_html } from '@foldo/md'

export default {
  '/static': static({ out: '/public' }),
  '/pages': md_to_html({ out: '/public' })
}
```

# Features

- Write modern, ES6 Syntax in Node thanks to [`esm`](https://github.com/standard-things/esm)

- Watches files *and their dependencies* for changes thanks to [`watches`](https://github.com/marshallcb/watches)

- Install size is minimal ![install size](https://badgen.net/packagephobia/install/foldo/?label=foldo&color=1A5)

- Easy plugin system ([template](https://github.com/@foldo/template))

---

## License

ISC © [Marshall Brandt](https://m4r.sh)
