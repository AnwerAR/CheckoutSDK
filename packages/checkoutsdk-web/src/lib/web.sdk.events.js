export default class WebSDKEvents {
	constructor() {
		this.listeners = new Map();
		this.onceListeners = new Map();
		this.triggerdLabels = new Map();
	}

	// eslint-disable-next-line no-underscore-dangle
	_fCheckPast(label, callback) {
		if (this.triggerdLabels.has(label)) {
			callback(this.triggerdLabels.get(label));
			return true;
		}

		return false;
	}

	on(l, callback, checkPast = false) {
		const labels = l.split(",");
		// eslint-disable-next-line no-plusplus
		for (let i = 0; i < labels.length; i++) {
			const label = labels[i];
			// eslint-disable-next-line no-unused-expressions
			this.listeners.has(label) || this.listeners.set(label, []);
			this.listeners.get(label).push(callback);
			// eslint-disable-next-line no-underscore-dangle
			if (checkPast) this._fCheckPast(label, callback);
		}
	}

	onReady(label, callback) {
		this.on(label, callback, true);
	}

	// execute the callback onetime the label is trigger
	once(label, callback, checkPast = false) {
		// eslint-disable-next-line no-unused-expressions
		this.onceListeners.has(label) || this.onceListeners.set(label, []);
		// eslint-disable-next-line no-underscore-dangle
		if (!(checkPast && this._fCheckPast(label, callback))) {
			this.onceListeners.get(label).push(callback);
		}
	}

	onceReady(label, callback) {
		this.once(label, callback, true);
	}

	off(label, callback = true) {
		if (callback === true) {
			this.listeners.delete(label);
			this.onceListeners.delete(label);
		} else {
			// eslint-disable-next-line no-underscore-dangle
			const _off = (inListener) => {
				const listeners = inListener.get(label);
				if (listeners) {
					inListener.set(
						label,
						listeners.filter((value) => !(value === callback)),
					);
				}
			};
			_off(this.listeners);
			_off(this.onceListeners);
		}
	}

	trigger(label, ...args) {
		let res = false;
		this.triggerdLabels.set(label, ...args);
		// eslint-disable-next-line no-underscore-dangle
		const _trigger = (inListener, label, ...args) => {
			const listeners = inListener.get(label);
			if (listeners && listeners.length) {
				listeners.forEach((listener) => {
					listener(...args);
				});
				res = true;
			}
		};
		_trigger(this.onceListeners, label, ...args);
		_trigger(this.listeners, label, ...args);
		this.onceListeners.delete(label);
		return res;
	}
}
