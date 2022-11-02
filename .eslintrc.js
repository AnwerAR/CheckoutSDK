module.exports = {
	env: {
		browser: true,
		commonjs: true,
		es2021: true,
		jest: true,
	},
	extends: ["airbnb", "prettier"],
	plugins: ["prettier"],
	parserOptions: {
		ecmaVersion: "latest",
	},
	rules: {
		"prettier/prettier": ["error"],
		quotes: [2, "double", { avoidEscape: true }],
		"no-unused-vars": "error",
	},
	ignorePatterns: ["packages/**/build/", "./packages/**/build/*.js"],
};
