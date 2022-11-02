/* eslint-disable react/prop-types */
// eslint-disable-next-line prettier/prettier
import { h } from "preact";
import { useState } from "preact/hooks";
import Input from "./input";
import { useMainContext } from "../lib/main.context";

// eslint-disable-next-line react/prop-types
export default function FormGenerator({ code, data, links, subItem }) {
	const { selectedNetwork, setSelectedNetwork } = useMainContext();
	// eslint-disable-next-line no-unused-vars
	const [errors, setErrors] = useState({});

	const categorizeFormData = (data) => {
		const newData = data.filter((d) => !["expiryMonth", "expiryYear"].includes(d.name));
		const expiry = data.filter((d) => ["expiryMonth", "expiryYear"].includes(d.name));
		if (expiry.length > 0 && newData.length > 0) {
			return [...newData, expiry];
		}

		if (newData.length < 1) {
			return expiry;
		}

		return newData;
	};

	const onInputChange = (key, value) => {
		setSelectedNetwork({
			...selectedNetwork,
			formData: {
				...selectedNetwork?.formData,
				[key]: value,
			},
		});
	};

	return (
		<div className={!subItem ? `network-form-container ${code}` : "network-form-row"}>
			{categorizeFormData(data).map((d) => {
				if (Array.isArray(d)) {
					return (
						<FormGenerator
							key={d.code}
							code={code}
							data={d}
							links={links}
							subItem
						/>
					);
				}

				return (
					<Input
						key={code}
						type={d.type}
						name={d.name}
						code={code}
						id={`${code}-${d.name}`}
						placeholder={d.label}
						label={d.label}
						links={links}
						onInput={(e) => {
							onInputChange(d.name, e.target.value);
						}}
						value={selectedNetwork?.formData && selectedNetwork?.formData[d.name]}
						errorMsg={errors[d.name]?.message}
					/>
				);
			})}
		</div>
	);
}
