// eslint-disable-next-line no-unused-vars
import { h } from "preact";
import { useEffect } from "preact/hooks";
import { useMainContext } from "./main.context";

export const apiRequest = async (url, params) => {
	const response = await fetch(url, {
		method: "GET",
		...params,
	});

	const body = await response.json();
	return { status: response.status, ...body, ok: response.ok };
};

export default function useListFetch(url, params, deps = []) {
	const {
		setLoading,
		setListResponse,
		setGlobalError,
		loading,
		listResponse,
		globalError,
		webSDK,
	} = useMainContext();

	useEffect(() => {
		if (!url || !webSDK) return;
		setLoading(true);
		webSDK.trigger("list-loading", "List response is loading!");
		setGlobalError(null);
		apiRequest(url, params)
			.then((res) => {
				if (res.ok) {
					setListResponse(res);
					setGlobalError(null);
					webSDK.trigger("list-loaded", "List response is loaded", res);
				} else {
					setListResponse({});
					setGlobalError(res);
					webSDK.trigger("list-error", res);
				}
				setLoading(false);
			})
			.catch((error) => {
				setLoading(false);
				setGlobalError(error);
				webSDK.trigger("list-error", error);
			});

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [...deps, url, webSDK]);

	return { loading, listResponse, globalError };
}
