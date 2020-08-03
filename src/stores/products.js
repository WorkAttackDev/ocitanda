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
      let res = await axiosInstance.get("products/admin", {
        params: {
          limit,
          page,
          category,
          order,
        },
      });

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

  const getProductById = async (id) => {
    try {
      const res = await axiosInstance.get("products/" + id);
      const data = res.data;

      const product = Product({
        id: data.id,
        name: data.name,
        desc: data.description,
        price: data.price,
        qty: data.quantity,
        producer: "Ocitanda",
        img: api + data.image_url,
        deletedAt: data.deleted,
        producerId: data.producer_id,
        categoryId: data.category_id,
      });

      return product;
    } catch (error) {
      return handleError(error);
    }
  };

  const searchProductsBySlug = async (slug = "") => {
    try {
      let res = await axiosInstance.get("products/search/" + slug);
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
      console.error(error);
      return [];
    }
  };

  const createProduct = async (product = new FormData()) => {
    try {
      let res = await axiosInstance.post("products", product);
      return res;
    } catch (error) {
      return handleError(error);
    }
  };

  const editProduct = async (product = new FormData()) => {
    try {
      let res = await axiosInstance.patch("products", product);
      return res;
    } catch (error) {
      return handleError(error);
    }
  };

  const invalidate = async (id, reverse = false) => {
    try {
      let res = await axiosInstance.patch("products/invalidate/" + id, {
        invalidate: reverse,
      });
      return res;
    } catch (error) {
      return handleError(error);
    }
  };

  const deleteProduct = async (id) => {
    try {
      let res = await axiosInstance.delete("products/" + id);
      return res;
    } catch (error) {
      return handleError(error);
    }
  };

  return {
    subscribe,
    searchProductsBySlug,
    getProductById,
    createProduct,
    invalidate,
    getAsAdmin,
    editProduct,
    deleteProduct,
  };
}

export const products = createProducts();
