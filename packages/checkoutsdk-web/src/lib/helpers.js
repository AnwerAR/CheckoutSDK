export function scriptIs(node) {
	return node.tagName === "SCRIPT";
}

export function scriptClone(node) {
	const script = document.createElement("script");
	script.text = node.innerHTML;

	let i = -1;
	const attrs = node.attributes;
	let attr;
	// eslint-disable-next-line no-plusplus
	while (++i < attrs.length) {
		script.setAttribute((attr = attrs[i]).name, attr.value);
	}
	return script;
}

export function scriptReplace(node) {
	if (scriptIs(node) === true) {
		node.parentNode.replaceChild(scriptClone(node), node);
	} else {
		let i = -1;
		const children = node.childNodes;
		// eslint-disable-next-line no-plusplus
		while (++i < children.length) {
			scriptReplace(children[i]);
		}
	}

	return node;
}

export async function validateFormInput(endpoint, data, cb) {
	return fetch(endpoint, {
		method: "POST",
		body: JSON.stringify(data),
	})
		.then((response) => response.json())
		.then((response) => {
			if (cb && typeof cb === "function") cb(response);
			return response.valid;
		});
}

export async function chargeNetwork(endpoint, data, cb) {
	return fetch(endpoint, {
		method: "POST",
		body: JSON.stringify(data),
	})
		.then((response) => response.json())
		.then((response) => {
			if (cb && typeof cb === "function") cb(response);
			return response;
		});
}

export function addStyle(styleString) {
	const style = document.createElement("style");
	style.textContent = styleString;

	document.head.append(style);
}

export default Object.assign("Helpers", {
	scriptReplace,
	validateFormInput,
});
