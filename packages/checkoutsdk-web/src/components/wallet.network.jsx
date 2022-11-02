/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable react/prop-types */
import { h } from "preact";
import { useEffect, useRef, useState } from "preact/hooks";
import { scriptReplace } from "../lib/helpers";
import { useMainContext } from "../lib/main.context";
import Loader from "./loader";

export default function WalletNetwork({ formLink, code, network }) {
	const [loading, setLoading] = useState(false);
	const { submitBtnContainerID } = useMainContext();

	const iframeRef = useRef();

	const resultHandler = (param1, param2) => {
		// eslint-disable-next-line no-console
		console.log({ param1, param2 });
	};

	useEffect(() => {
		setLoading(true);
		fetch(formLink)
			.then((res) => res.text())
			.then((res) => {
				// eslint-disable-next-line prefer-regex-literals
				const con = `${res.replace(new RegExp(/\${formId}|_/g, "gi"), code)}`;
				document.getElementById(submitBtnContainerID).innerHTML = "";
				const scriptt = `
				<div id="data-holder" data-network='${JSON.stringify(network)}'></div>
				<script>
						var networkEl = document.getElementById('data-holder');
						var pymnBtn = document.getElementById('${submitBtnContainerID}');
						var network = JSON.parse(networkEl.dataset.network);
						networkEl.remove()
						fn${code}${code}initSubmit(network, pymnBtn, ${resultHandler})
				</script>
				`;
				iframeRef.current.innerHTML = con + scriptt;
				setLoading(false);
			});

		return () => {
			document.getElementById(submitBtnContainerID).innerHTML = "";
		};
	}, [formLink, code, network]);

	const fieldSet = document.getElementById(`${code}-fieldset`);
	const fieldSetNetwork = document.getElementById(`${code}`);

	useEffect(() => {
		if (fieldSetNetwork && fieldSet) {
			scriptReplace(fieldSetNetwork);
			fieldSet.style.display = "none";
		}
	}, [fieldSetNetwork, fieldSet]);

	return (
		<div className="network-wallet-container">
			{/* eslint-disable-next-line jsx-a11y/iframe-has-title */}
			{loading && <Loader />}
			<div ref={iframeRef} />
			<div id="paymentLoadingIcon" />
		</div>
	);
}
