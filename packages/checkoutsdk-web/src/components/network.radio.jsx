import { h } from "preact";

// eslint-disable-next-line react/prop-types
export default function NetworkRadio({ selected, code, label, id, links, onChange }) {
	return (
		<button
			type="button"
			className={`network-selector ${selected ? "selected" : ""}`}
			onClick={() => {
				onChange(!selected);
			}}>
			{/* eslint-disable-next-line jsx-a11y/click-events-have-key-events */}
			<input
				type="radio"
				name="selected-network"
				className="hidden"
				id={id || code}
				value={code}
				checked={selected}
			/>
			<img
				// eslint-disable-next-line react/prop-types
				src={links.logo}
				alt={label}
				style={{ width: "45px", height: "auto" }}
			/>
			<label htmlFor={id || code}>
				<span>{label}</span>
			</label>
		</button>
	);
}
