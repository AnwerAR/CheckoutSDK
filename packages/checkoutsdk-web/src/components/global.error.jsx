import { h } from "preact";
import { useEffect, useState } from "preact/hooks";
import { useMainContext } from "../lib/main.context";
import Modal from "./popup.modal";

export default function GlobalError() {
	const { globalError, webSDK } = useMainContext();
	const [open, setOpen] = useState(false);
	useEffect(() => {
		webSDK.trigger("global-error", globalError);
		setOpen(true);
	}, []);
	return (
		<div style={{ color: "red" }}>
			<h4>There is an error.</h4>

			{open && (
				<Modal open={open}>
					<h4>There is an error.</h4>
					{globalError && JSON.stringify(globalError)}
					<button onClick={() => setOpen(!open)}>Close popup</button>
				</Modal>
			)}
		</div>
	);
}
