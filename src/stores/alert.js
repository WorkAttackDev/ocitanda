import { writable } from "svelte/store";

function createAlert() {
  const initial = {
    text: "",
    resolve: () => {},
    reject: () => {},
  };
  const { subscribe, set } = writable(initial);

  const close = () => {
    set(initial);
  };

  const show = (data = initial) => set(data);

  return {
    subscribe,
    show,
    close,
  };
}

export const alert = createAlert();
