import { writable } from "svelte/store";
import { axiosInstance, handleError } from "../api";

function createProducer() {
  const { subscribe } = writable(false);

  const getProducers = async () => {
    try {
      let res = await axiosInstance.get("producers");
      let data = res.data;
      return data;
    } catch (error) {
      return handleError(error);
    }
  };

  return {
    subscribe,
    getProducers,
  };
}

export const producer = createProducer();
