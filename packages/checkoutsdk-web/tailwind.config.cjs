/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.{js,jsx}"],
	prefix: "sdk-",
	corePlugins: {
		preflight: false,
	},
	theme: {
		extend: {
			colors: {
				primary: "blue",
			},
		},
	},
	plugins: [],
};
