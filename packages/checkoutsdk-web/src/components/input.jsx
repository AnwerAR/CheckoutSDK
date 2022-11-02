import { h } from "preact";
import { validateFormInput } from "../lib/helpers";
import { useMainContext } from "../lib/main.context";

// eslint-disable-next-line react/prop-types
export default function Input({ code, type, name, id, label, errorMsg, value, links, ...rest }) {
	const { selectedNetwork, setSelectedNetwork } = useMainContext();
	const getFieldErrorMsg = (validationResponse = {}) => {
		if (Object.keys(validationResponse).length < 1 || validationResponse.valid) {
			return null;
		}

		if (
			validationResponse &&
			validationResponse?.messages &&
			validationResponse.messages[name]
		) {
			return validationResponse.messages[name];
		}

		return null;
	};

	const onResponse = (validationResponse) => {
		setSelectedNetwork({
			...selectedNetwork,
			validationResponse: {
				...selectedNetwork.validationResponse,
				[name]: getFieldErrorMsg(validationResponse),
			},
		});
	};

	return (
		<div className="network-form-field">
			<label htmlFor={id || `${code}-${name}`}>{label}</label>
			<input
				type={type || "text"}
				name={name}
				id={id || `${code}-${name}`}
				// eslint-disable-next-line react/prop-types
				onBlur={() => {
					if (selectedNetwork?.formData) {
						// eslint-disable-next-line react/prop-types
						validateFormInput(links.validation, selectedNetwork.formData, onResponse);
					}
				}}
				// eslint-disable-next-line react/jsx-props-no-spreading
				{...rest}
			/>
			{((selectedNetwork?.validationResponse &&
				selectedNetwork.validationResponse[name] &&
				selectedNetwork?.validationResponse[name].type === "ERROR") ||
				errorMsg) && (
				<div className="error-msg">
					{(selectedNetwork?.validationResponse &&
						selectedNetwork?.validationResponse[name].message) ||
						errorMsg}
				</div>
			)}
		</div>
	);
}
