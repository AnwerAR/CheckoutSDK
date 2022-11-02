import { h, createContext } from "preact";
import { useContext, useState } from "preact/hooks";

const MainContext = createContext({});

// eslint-disable-next-line react/prop-types
function MainContextProvider({ children }) {
	const [appRoot, setAppRoot] = useState(null);
	const [config, setConfig] = useState({
		view: "jsonForms",
		listUrl: null,
	});
	const [listResponse, setListResponse] = useState({});
	const [globalError, setGlobalError] = useState(null);
	const [loading, setLoading] = useState(false);
	const [selectedNetwork, setSelectedNetwork] = useState({});
	const [chargeResponse, setChargeResponse] = useState(null);
	const [submitBtnContainerID, setSubmitBtnContainerID] = useState("sub-btn-container");

	const [webSDK, setWebSDK] = useState(null);

	return (
		<MainContext.Provider
			// eslint-disable-next-line react/jsx-no-constructed-context-values
			value={{
				appRoot,
				setAppRoot,
				config,
				setConfig,
				listResponse,
				setListResponse,
				globalError,
				setGlobalError,
				loading,
				setLoading,
				webSDK,
				setWebSDK,
				selectedNetwork,
				setSelectedNetwork,
				chargeResponse,
				setChargeResponse,
				submitBtnContainerID,
				setSubmitBtnContainerID,
			}}>
			{children}
		</MainContext.Provider>
	);
}

export const useMainContext = () => useContext(MainContext);
export { MainContextProvider };
export default MainContext;
