import { Fragment, h } from "preact";
import { useEffect, useState } from "preact/hooks";
import { useMainContext } from "../lib/main.context";
import Network from "./network";

export default function NetworkList() {
	const { listResponse, setSelectedNetwork, webSDK } = useMainContext();
	const [applicable, setApplicable] = useState([]);

	useEffect(() => {
		if (listResponse && listResponse?.networks?.applicable) {
			setApplicable(listResponse.networks.applicable);
		}
	}, [listResponse]);

	useEffect(() => {
		const selectedN = applicable.find((a) => a.selected) || {}
		setSelectedNetwork(selectedN);
		if(webSDK && Object.keys(selectedN).length > 0) {
			webSDK.trigger("network-selection", selectedN)
		}
	}, [applicable, setSelectedNetwork]);

	return (
		<Fragment>
			<h3 className="list-title">Network List</h3>
			<div className="list-wrapper">
				{applicable &&
					applicable.map((data) => (
						// eslint-disable-next-line react/jsx-key
						<Network
							network={data}
							// eslint-disable-next-line react/jsx-props-no-spreading
							{...data}
							onChange={() => {
								setApplicable([
									...applicable.map((d) => {
										if (data.code === d.code) {
											// eslint-disable-next-line no-param-reassign
											d.selected = true;
										} else {
											// eslint-disable-next-line no-param-reassign
											d.selected = false;
										}
										return d;
									}),
								]);
							}}
						/>
					))}
			</div>
		</Fragment>
	);
}
