import { h } from "preact";
import { createPortal } from "preact/compat";

export default function Modal({ open, children }) {
	const container = document.getElementsByTagName("body")[0];

	return createPortal(
		open && (
			<div class="popup">
				<div className="popup-body">{children}</div>
			</div>
		),
		container,
	);
}
