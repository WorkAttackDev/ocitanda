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

  const createCategory = async (name) => {
    try {
      let res = await axiosInstance.post("categories", { name });
      return res.data.category;
    } catch (error) {
      return handleError(error);
    }
  };

  const updateCategory = async (id, name) => {
    try {
      let res = await axiosInstance.post("categories/" + id, { name });
      return res.data.category;
    } catch (error) {
      return handleError(error);
    }
  };

  const deleteCategory = async (id) => {
    try {
      let res = await axiosInstance.delete("categories/" + id);
      return res.data;
    } catch (error) {
      return handleError(error);
    }
  };

  return {
    subscribe,
    getCategories,
    createCategory,
    updateCategory,
    deleteCategory,
  };
}

export const category = createCategory();
