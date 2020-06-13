import { login } from "../api";

import { writable } from "svelte/store";

function createUser() {
    const initial = {isAuth: false, token: "", userId: ""};
	const { subscribe, set, update } = writable(initial);

	return {
		subscribe,
		login: (isAuth, token, userId) => set({isAuth, token, userId}),
		logout: () => set(initial)
	};
}

export const user = createUser();