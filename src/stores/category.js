import { writable } from "svelte/store";
import { axiosInstance, handleError } from "../api";

function createCategory() {
  const { subscribe, set } = writable(false);

  const getCategories = async () => {
    try {
      let res = await axiosInstance.get("categories");
      let data = res.data;
      return data;
    } catch (error) {
      return handleError(error);
    }
  };

  return {
    subscribe,
    getCategories,
  };
}

export const category = createCategory();
