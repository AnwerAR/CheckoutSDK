import { useEffect, useRef, useState } from "react";
import PayoneerCheckoutSDK from "@anwerar/checkoutsdk-web";
import "@anwerar/checkoutsdk-web/dist/esm/checkoutsdk-web.css";

function App() {
	const sdkRef = useRef();
	const [instance, setInstance] = useState(null);

	useEffect(() => {
		const urlSearchParams = new URLSearchParams(window.location.search);
		const params = Object.fromEntries(urlSearchParams.entries());

		if(instance) return;

		const _instance = new PayoneerCheckoutSDK({
			listUrl: params.listUrl,
			element: sdkRef.current,
			theme: "boxedBlue",
		});

		_instance.render();

		_instance.on("list-loading,list-loaded", (msg, data = null) => {
			console.log(msg, (data && data) || "");
		});

		_instance.on("global-error", (error) => {
			console.error(error);
		});

		_instance.on("instance-init,instance-destroyed", (msg) => {
			console.log(msg);
		});

		_instance.on("charge-response", (data) => {
			console.log("on-charge-response", data);
		});

		_instance.on("network-selection", (data) => {
			console.log("on-network-selection", data);
		});

		setInstance(_instance);

	}, []);

	return (
		<div className="App">
			<h1>Checkout SDK Web (ESM Build)</h1>
			<div ref={sdkRef} />
			<button onClick={() => instance && instance.destroy()}>Destroy</button>
			<button onClick={() => instance && instance.render()}>Re Init</button>
			<button onClick={() => instance && instance.trigger("open-popup", "Hello Universe!")}>
				Open a popup
			</button>
		</div>
	);
}

export default App;
