module.exports = {
	env: {
		browser: true,
		commonjs: true,
		es6: true,
	},
	extends: ['airbnb-base'],
	globals: {
		Atomics: 'readonly',
		SharedArrayBuffer: 'readonly',
	},
	parserOptions: {
		ecmaVersion: 11,
	},
	rules: {
		'linebreak-style': 0,
		'no-tabs': 0,
		indent: 0,
		'comma-dangle': 0,
		'implicit-arrow-linebreak': 0,
	},
};
