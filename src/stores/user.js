import { writable } from "svelte/store";

let timeout;

function createUser() {
  const initial = { isAuth: false, token: "", consumer: {}, expiryDate: 0 };
  const { subscribe, set, update } = writable(initial);

  const logout = () => {
    set(initial);
    clearTimeout(timeout);
  };

  return {
    subscribe,
    login: (user) => {
      set(user);
      if (user.token && user.expiryDate) {
        if (timeout) clearTimeout(timeout);
        timeout = setTimeout(() => {
          set(initial);
          console.log("finish: ", timeout);
        }, new Date(user.expiryDate).getTime() - new Date().getTime());
      } else {
        clearTimeout(timeout);
      }
    },
    logout,
  };
}

export const user = createUser();
