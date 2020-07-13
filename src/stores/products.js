import { writable } from "svelte/store";
import { fetchProductsBySlug } from "../api";

function createProducts() {
  const { subscribe, set, update } = writable([]);

  const searchProductsBySlug = async (slug = "") => {
    const res = await fetchProductsBySlug(slug);
    if (res.error) return [];
    return res;
  };

  return {
    subscribe,
    searchProductsBySlug,
  };
}

export const products = createProducts();
