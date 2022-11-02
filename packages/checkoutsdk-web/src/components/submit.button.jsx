import { h } from "preact";
import { useState } from "preact/hooks";
import { chargeNetwork, validateFormInput } from "../lib/helpers";
import { useMainContext } from "../lib/main.context";

export default function SubmitButton() {
	const { selectedNetwork, setSelectedNetwork, webSDK } = useMainContext();
	const [error, setError] = useState(null);

	if (Object.keys(selectedNetwork).length < 1 || selectedNetwork?.method === "WALLET") {
		return null;
	}

	const formatError = (validationResponse = {}) => {
		if (Object.keys(validationResponse).length < 1) {
			return {};
		}

		if (validationResponse && validationResponse?.messages) {
			return validationResponse.messages;
		}

		return {};
	};

	const onResponse = (validationResponse) => {
		setSelectedNetwork({
			...selectedNetwork,
			validationResponse: formatError(validationResponse),
		});
	};

	const onChargeResponse = (response) => {
		webSDK.trigger("charge-response", response);
	};

	const onSubmit = async () => {
		if (!selectedNetwork?.code) {
			setError("Select a network first!");
		} else if (!selectedNetwork?.formData) {
			setError("Enter your card details to selected network!");
		} else {
			setError(null);
			const isValid = await validateFormInput(
				selectedNetwork?.links?.validation,
				selectedNetwork.formData,
				onResponse,
			);

			const data = {
				account: selectedNetwork.formData,
				autoRegistration: false,
				providerRequests: [],
				browserData: {
					browserScreenHeight: window.innerHeight,
					browserScreenWidth: window.innerWidth,
					colorDepth: 30,
					language: navigator.language,
					timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
				},
			};

			if (isValid) {
				await chargeNetwork(selectedNetwork?.links?.operation, data, onChargeResponse);
			}
		}
	};

	return (
		<div>
			<button
				type="button"
				className="submit-btn-normal"
				onClick={onSubmit}>
				Pay
			</button>
			<div className="error-msg">{error}</div>
		</div>
	);
}
