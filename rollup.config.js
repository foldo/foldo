import resolve from '@rollup/plugin-node-resolve';

export default [{
	input: 'src/index.js',
	cache: false,
	output: [{
		format: 'cjs',
		file: 'dist/index.cjs',
		sourcemap: false,
	},{
		format: 'esm',
		file: 'dist/index.js',
		sourcemap: false,
	}],
	plugins: [
		resolve()
	],
	external: [
		'watches'
	]
}]