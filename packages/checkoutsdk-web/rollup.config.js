/* eslint-disable import/no-extraneous-dependencies */
import livereload from "rollup-plugin-livereload";
import { babel } from "@rollup/plugin-babel";
import postcss from "rollup-plugin-postcss";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import { name } from "./package.json";
import { uglify } from "rollup-plugin-uglify";
import commonjs from "rollup-plugin-commonjs";

const watch = process.env.ROLLUP_WATCH;

export default {
	input: "./src/index.jsx",
	output: [
		{
			file: `dist/umd/${name.split("/")[1]}.js`,
			format: "umd",
			name: "PayoneerCheckoutSDK",
			sourcemap: watch,
			esModule: false,
			// exports: "default",

		},
		{
			file: `dist/esm/${name.split("/")[1]}.js`,
			format: "esm",
			sourcemap: watch,
		},
	],
	plugins: [
		watch && livereload(),
		!watch && uglify(),
		babel({
			exclude: "node_modules/**",
			babelHelpers: "bundled",
		}),
		nodeResolve({ extensions: [".js", ".jsx"] }),
		postcss({
			config: {
				path: "./postcss.config.js",
			},
			extensions: [".css"],
			minimize: true,
			extract: true,
		}),
		commonjs({
			include: "node_modules/**",
		}),
	],
};
