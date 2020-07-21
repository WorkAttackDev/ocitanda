import { writable } from "svelte/store";
import { axiosInstance, handleError, api } from "../api";
import Product from "../models/Product";

function createProducts() {
  const { subscribe, set, update } = writable([]);

  const getAsAdmin = async (
    limit = 10,
    page = 1,
    category = "Todos",
    order = 1
  ) => {
    try {
      let res = await axiosInstance.get("products", {
        params: {
          limit,
          page,
          category,
          order,
        },
        data: {
          isAdmin: true,
        },
      });
      console.log(res);
      
      return res.data.map(
        ({ name, id, quantity, price, image_url, description, deleted }) =>
          Product({
            id,
            name,
            desc: description,
            price,
            qty: quantity,
            producer: "Ocitanda",
            img: api + image_url,
            deletedAt: deleted,
          })
      );
    } catch (error) {
      return handleError(error);
    }
  };

  const searchProductsBySlug = async (slug = "") => {
    try {
      let res = await axiosInstance.get("products/search/" + slug);
      return res.data.map(
        ({ name, id, quantity, price, image_url, description, deleted }) =>
          Product(
            id,
            name,
            description,
            price,
            quantity,
            "Ocitanda",
            api + image_url,
            deleted
          )
      );
    } catch (error) {
      console.error(error);
      return [];
    }
  };

  const createProduct = async (product = new FormData()) => {
    try {
      let res = await axiosInstance.post("products", product);
      console.log(res);
      return res;
    } catch (error) {
      return handleError(error);
    }
  };

  const invalidate = async (id, reverse = false) => {
    console.log(id, reverse);
    
    try {
      let res = await axiosInstance.patch("products/invalidate/" + id, {
        invalidate: reverse,
      });

      console.log(res);
      return res;
    } catch (error) {
      return handleError(error);
    }
  };

  return {
    subscribe,
    searchProductsBySlug,
    createProduct,
    invalidate,
    getAsAdmin,
  };
}

export const products = createProducts();
