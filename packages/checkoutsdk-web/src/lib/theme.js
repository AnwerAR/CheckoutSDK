import { addStyle } from "./helpers";

const theme = {
	default: {
		"color-primary": "#eee",
		"color-primary-invert": "#000",
		"size-containerMax": "600px",
		"border-listItem": "0px",
	},
	boxedDefault: {
		"color-primary": "#eee",
		"color-primary-invert": "#000",
		"size-containerMax": "600px",
		"border-listItem": "1px",
	},
	blue: {
		"color-primary": "#0084E7",
		"color-primary-invert": "#ffffff",
		"size-containerMax": "600px",
		"border-listItem": "0px",
	},
	boxedBlue: {
		"color-primary": "#0084E7",
		"color-primary-invert": "#ffffff",
		"size-containerMax": "600px",
		"border-listItem": "1px",
	},
	orange: {
		"color-primary": "#ff9900",
		"color-primary-invert": "#ffffff",
		"size-containerMax": "100%",
		"border-listItem": "0px",
	},
	boxedOrange: {
		"color-primary": "#ff9900",
		"color-primary-invert": "#ffffff",
		"size-containerMax": "600px",
		"border-listItem": "1px",
	},
};

const generateRoot = (data) => {
	const keys = Object.keys(data);
	return keys.reduce((a, p, i) => {
		const value = data[p];
		a += `--payoneerSDK-${p}: ${value};`;
		if (i === keys.length - 1) {
			a = `:root {${a}}`;
		}

		return a;
	}, "");
};

export default function applyTheme(variant) {
	if(variant && theme[variant]) {
		return addStyle(generateRoot(theme[variant]));
	}

	addStyle(generateRoot(theme.default));
}
