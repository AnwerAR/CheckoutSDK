/* eslint-disable react-hooks/exhaustive-deps */
/* @jsx h */
import { h } from "preact";
import { useEffect, useState } from "preact/hooks";
import { useMainContext } from "./lib/main.context";
import Loader from "./components/loader";
import useListFetch from "./lib/useListFetch";
import GlobalError from "./components/global.error";
import NetworkList from "./components/network.list";

import "./index.scss";
import SubmitButton from "./components/submit.button";
import Modal from "./components/popup.modal";

// eslint-disable-next-line react/prop-types
export default function App({ appRoot, webSDK, ...props }) {
	const {
		setConfig,
		setAppRoot,
		globalError,
		loading,
		config,
		setWebSDK,
		submitBtnContainerID,
	} = useMainContext();
	const [open, setOpen] = useState(false);
	const [popupContent, setPopupContent] = useState(false);


	useEffect(() => {
		if(!webSDK) return;
		webSDK.on('open-popup', (data) => {
			setOpen(true);
			setPopupContent(data);
		});
	}, [webSDK])

	useEffect(() => {
		setConfig({ ...config, ...props });
		setAppRoot(appRoot);
		setWebSDK(webSDK);
	}, []);

	const getListUrl = () => {
		if (!config.listUrl) return null;
		if (config.view) return `${config.listUrl}?view=${config.view}`;
		return config.listUrl;
	};

	useListFetch(getListUrl(), {}, [config.listUrl]);

	const renderEl = () => {
		if (globalError) return <GlobalError />;

		return loading ? <Loader /> : <NetworkList />;
	};

	return (
		<div className="webSDK-container">
			{renderEl()}
			{open && (
				<Modal open={open}>
					<h2>{popupContent || 'Hello world'}</h2>
					<button onClick={() => setOpen(!open
						)}>
						Close popup
					</button>
				</Modal>
			)}
			<div
				className="submit-btn-wrapper"
				id={submitBtnContainerID}>
				<SubmitButton />
			</div>
		</div>
	);
}
