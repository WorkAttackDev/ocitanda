import { writable } from "svelte/store";
import { axiosInstance, handleError } from "../api";

function createProducer() {
  const { subscribe, set } = writable([]);

  const getProducers = async () => {
    try {
      let res = await axiosInstance.get("producers");
      let data = res.data;
      return data;
    } catch (error) {
      return handleError(error);
    }
  };

  const getProducer = async (id = 0) => {
    try {
      let res = await axiosInstance.get("producers/" + id);
      let data = res.data;
      return data;
    } catch (error) {
      return handleError(error);
    }
  };

  const initProducers = async () => {
    const producers = await getProducers();
    if (producers.error) return;
    set(producers);
  };

  const createProducer = async (name = "") => {
    if (!name.trim()) return;

    try {
      let res = await axiosInstance.post("producers", {
        name,
      });
      let data = res.data;
      await initProducers();
      return data;
    } catch (error) {
      return handleError(error);
    }
  };

  const createPlanting = async ({
    name = "",
    startDate,
    endDate,
    producerId,
  }) => {
    try {
      let res = await axiosInstance.post("plantings", {
        name,
        start: startDate,
        end: endDate,
        producerId,
      });

      let data = res.data;
      await initProducers();
      return data;
    } catch (error) {
      return handleError(error);
    }
  };

  const updateProducer = async ({ name = "", id = 0 }) => {
    if (!name.trim() || !id) return;

    try {
      let res = await axiosInstance.post("producers/" + id, {
        name,
      });
      let data = res.data;
      await initProducers();
      return data;
    } catch (error) {
      return handleError(error);
    }
  };

  const updatePlanting = async ({
    name = "",
    startDate,
    endDate,
    id = 0,
  }) => {

    try {
      let res = await axiosInstance.post("plantings/" + id, {
        name,
        start: startDate,
        end: endDate,
      });

      let data = res.data;
      await initProducers();
      return data;
    } catch (error) {
      return handleError(error);
    }
  };

  const deleteProducer = async (id = 0) => {
    if (!id) return;
    try {
      let res = await axiosInstance.delete("producers/" + id);
      let data = res.data;
      await initProducers();
      return data;
    } catch (error) {
      return handleError(error);
    }
  };

  const deletePlanting = async (id = 0) => {
    if (!id) return;
    try {
      let res = await axiosInstance.delete("plantings/" + id);
      let data = res.data;
      await initProducers();
      return data;
    } catch (error) {
      return handleError(error);
    }
  };

  return {
    subscribe,
    getProducers,
    getProducer,
    createProducer,
    createPlanting,
    updateProducer,
    deleteProducer,
    deletePlanting,
    initProducers,
    updatePlanting,
  };
}

export const producer = createProducer();
