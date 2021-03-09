<div align="center">
  <img src="https://github.com/foldo/foldo/raw/main/meta/foldo.png" alt="Foldo" width="80" />
</div>

<h1 align="center">Foldo</h1>
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

Foldo is a simple, framework-agnostic approach for building project files.

[Documentation](https://foldo.dev) | [Plugins](https://github.com/foldo/plugins) | [Examples](https://github.com/foldo/examples)

### What it does
- Acts as a project's central hub for all build processes
- Watches files and their dependencies for changes
- Granularly rebuilds files for maximum efficiency
- Provides a simple API for custom builds

### What it doesn't do (but plugins can!)
- Foldo does not compile JS (use `esbuild`, `rollup`, or `webpack`)
- Foldo does not start a local dev server
- Foldo does not minify output files

# Motivation

Foldo was made to give weekend warriors the power to create delightful developer tools without having to reinvent the wheel (file system logic, error handling, CLI, etc). Foldo also encourages a modular project structure without compromising a smooth DevX. Frameworks like `Next.js` and `Vite` are extremely easy to use, but quite difficult to customize since they have such a large scope. Foldo is intended to limit the scope of such frameworks and encourage modular alternatives.

# Contributing

Coming Soon

# License

ISC © [Marshall Brandt](https://m4r.sh)