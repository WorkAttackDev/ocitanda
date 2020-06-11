import { writable } from "svelte/store";

function createUser() {
	const initial = { isAuth: false, token: "", consumer: {} };
	const { subscribe, set, update } = writable(initial);

	return {
		subscribe,
		login: (user) => {
			set({
				isAuth: user.isAuth,
				token: user.token,
				consumer: user.consumer,
			});
		},
		logout: () => set(initial),
	};
}

export const user = createUser();
