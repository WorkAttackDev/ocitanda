import { writable } from "svelte/store";

const buttonOptions = { text: "", onClick: undefined, href: "" };

function createNotification() {
  const initial = {
    type: "info",
    msg: "",
    title: "",
    callback: undefined,
    button: buttonOptions,
  };
  const { subscribe, set, update } = writable(initial);

  const close = () => {
    update(async (notif) => {
      if (notif.callback) await notif.callback();
      return initial;
    });
  };

  const closeWithoutCallback = () => {
    set(initial);
  };

  const show = (
    type,
    msg,
    title = "Notificação",
    callback,
    button = buttonOptions
  ) => {
    set({ type, msg, title, callback, button });
  };

  return {
    subscribe,
    show,
    close,
    closeWithoutCallback,
  };
}

export const notification = createNotification();
