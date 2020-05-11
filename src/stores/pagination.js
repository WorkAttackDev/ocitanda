import { writable } from "svelte/store";

const { subscribe, set, update } = writable(1);

export default {
	subscribe,
	nextPage: () => update((count) => count + 1),
	prevPage: () => update((count) => (count <= 0 ? count : count - 1)),
	reset: () => set(1),
};
