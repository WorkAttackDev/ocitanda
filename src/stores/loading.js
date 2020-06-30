import { writable } from "svelte/store";

function createLoading() {
	const { subscribe, set } = writable(false);

	const close = () => set(false);

	const show = ()=> set(true);

	return {
		subscribe,
		show,
		close
	};
}

export const loading = createLoading();
