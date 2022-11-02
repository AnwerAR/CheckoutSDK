/* @jsx h */
import { h, render } from "preact";
import App from "./App";
import { MainContextProvider } from "./lib/main.context";
import applyTheme from "./lib/theme";
import WebSDKEvents from "./lib/web.sdk.events";


function configError(param) {
	return new Error(`One of the required param "${param}" is missing`);
}

class PayoneerCheckoutSDK extends WebSDKEvents {
	config = {};

	appRoot = null;

	shadow = null;

	requiredConfig = ["listUrl"];

	requiredConfigRender = ["element"];

	constructor(config = {}) {
		super();

		// eslint-disable-next-line new-cap
		if (this.checkUserConfig(config, this.requiredConfig) !== true)
			throw new this.checkUserConfig(config, this.requiredConfig);

		const { element, theme, ...rest } = config;

		applyTheme(theme);

		this.config = rest;
		if (element) {
			this.setRootElement(element);
		}
	}

	// eslint-disable-next-line class-methods-use-this


	checkUserConfig(config, requiredConfig = this.requiredConfig) {
		// eslint-disable-next-line no-plusplus
		for (let i = 0; i < requiredConfig.length; i++) {
			if (!config[requiredConfig[i]]) {
				return configError(requiredConfig[i]);
			}
		}

		return true;
	}

	setRootElement(element) {
		if (!element) throw new Error("element is required");

		const appRoot = element instanceof HTMLElement ? element : document.getElementById(element);

		if (!appRoot) throw new Error("No app root detected!");
		this.appRoot = appRoot;
	}

	render(element = null) {
		// eslint-disable-next-line new-cap
		if (!this.appRoot && !element) throw new configError("element");

		if (element) {
			this.setRootElement(element);
		}

		this.destroy();

		render(
			<MainContextProvider>
				<App
					appRoot={this.appRoot}
					// eslint-disable-next-line react/jsx-props-no-spreading
					{...this.config}
					webSDK={this}
				/>
			</MainContextProvider>,
			this.appRoot,
		);
		setTimeout(() => this.trigger("instance-init", "WebSDK instance mounted"), 100);
	}

	shadowRender(element = null) {
		// eslint-disable-next-line new-cap
		if (!this.appRoot && !element) throw new configError("element");

		if (element) {
			this.setRootElement(element);
		}

		this.destroy();
		this.shadow = this.appRoot.attachShadow({ mode: "open" });
		render(
			<MainContextProvider>
				<App
					appRoot={this.appRoot}
					// eslint-disable-next-line react/jsx-props-no-spreading
					{...this.config}
				/>
			</MainContextProvider>,
			this.shadow,
		);
		setTimeout(() => this.trigger("instance-init", "WebSDK instance mounted"), 100);
	}

	destroy() {
		if (this.appRoot?.innerHTML) {
			this.appRoot.innerHTML = "";
			this.trigger("instance-destroyed", "WebSDK instance destroyed");
		}
	}
}

export default PayoneerCheckoutSDK;
