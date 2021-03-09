<div align="center">
  <img src="https://github.com/foldo/foldo/raw/main/meta/foldo.png" alt="Foldo" width="80" />
</div>

<h1 align="center">foldo</h1>
<h3 align="center">folder-based build system for JS projects</h3>
<div align="center">
  <a href="https://npmjs.org/package/foldo">
    <img src="https://badgen.net/npm/v/foldo/?color=42D" alt="version" />
  </a>
  <a href="https://packagephobia.com/result?p=foldo">
    <img src="https://badgen.net/packagephobia/install/foldo/?color=27D" alt="install size" />
  </a>
</div>
<br/>
<div align="center">
  <img src="https://github.com/foldo/foldo/raw/main/meta/build.gif" alt="How Foldo works" width=600 />
</div>

# Overview

Foldo allows you to define custom builders for each source directory in your project in a config file (`foldo.js`).
- `foldo dev` will watch source files and granularly rebuild affected outputs
- `foldo build` will build all output files

# Features

- Write modern, ES6 Syntax in Node thanks to [`esm`](https://github.com/standard-things/esm)

- Watches files *and their dependencies* for changes thanks to [`watches`](https://github.com/marshallcb/watches)

- Simple + Expressive Config

- Plugin-driven ([template](https://github.com/foldo/template))

# Config

Foldo expects an object (or array of objects) where keys denote the input directory, and values are the associated builders.

Example:
```js
import { copyTo } from '@foldo/static'

export default {
  // copies all files in /assets to /public
  '/assets': copyTo('public', {
    // ignore files/folders that start with _ or .
    ignore: /(^|[\/\\])[\._]./
  })
}
```

# Possibilities

Foldo was built to allow for a rich ecosystem of builders for custom project structures.

**Builders**

- Component Frameworks

- Lambda Functions -> Platform-specific Code (Vercel, CloudFlare Workers, Netlify, AWS, etc)

- Spritesheet generators

- Pull data from API / CMS

- Markdown to HTML

- Image Processing
  - Images to Depthmaps
  - Depthmaps to Slope fields
  - Images to various pre-defined crops

- Templates to HTML pages

- JS files with image links to downloaded image files

**Transforms**

- Minification for specific file types

- A11y & SEO checks for HTML files

- Caniuse checks for CSS files

- Sitemap generator

---

## License

ISC © [Marshall Brandt](https://m4r.sh)
