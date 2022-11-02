/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable react/prop-types */
import { h } from "preact";
import FormGenerator from "./generator";
import NetworkRadio from "./network.radio";
import WalletNetwork from "./wallet.network";

export default function Network({
	label,
	// button,
	code,
	localizedInputElements,
	method,
	// operationType,
	// redirect,
	selected,
	links,
	onChange,
	network,
}) {
	return (
		<div
			id={code}
			className="list-item">
			<NetworkRadio
				label={label}
				code={code}
				selected={selected}
				links={links}
				onChange={onChange}
			/>
			{selected && localizedInputElements && (
				<FormGenerator
					code={code}
					data={localizedInputElements}
					links={links}
				/>
			)}

			{method === "WALLET" && links?.localizedForm && selected && (
				// eslint-disable-next-line jsx-a11y/iframe-has-title
				<WalletNetwork
					formLink={links.localizedForm}
					code={code}
					network={network}
				/>
			)}
		</div>
	);
}
