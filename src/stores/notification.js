import { writable } from "svelte/store";

let timeout;

function createNotification() {
	const initial = { type: "info", msg:"", title: "" };
	const { subscribe, set } = writable(initial);

	const close = () => {
		set(initial);
	};

	const show = (type, msg, title = "Notificação") => {
		set({type, msg, title});
	};

	return {
		subscribe,
		show,
		close
	};
}

export const notification = createNotification();
