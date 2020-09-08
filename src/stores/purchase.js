import { writable } from "svelte/store";
import {
  handleError,
  axiosInstanceWithoutTimeout,
  axiosInstance,
} from "../api";
import Purchase, { purchasefromAPI } from "../models/Purchase";

function createPurchase() {
  const { subscribe } = writable(false);

  const create = async (newPurchase = Purchase()) => {
    delete newPurchase.id;
    try {
      const res = await axiosInstanceWithoutTimeout.post(
        "/purchases",
        newPurchase
      );
      return res.data.value;
    } catch (error) {
      handleError(error);
    }
  };

  const getByConsumerId = async (consumerId = 0) => {
    try {
      const res = await axiosInstance.get("/purchases/consumer/" + consumerId);
      const purchases = res.data.value.map(purchasefromAPI);
      return purchases;
    } catch (error) {
      handleError(error);
    }
  };

  const get = async () => {
    try {
      const res = await axiosInstance.get("/purchases");
      const purchases = res.data.value.map((_p) => purchasefromAPI(_p));
      return purchases;
    } catch (error) {
      handleError(error);
    }
  };

  const togglePay = async (paid = true, purchaseId) => {
    try {
      const res = await axiosInstanceWithoutTimeout.patch(
        "/purchases/pay/" + purchaseId,
        {
          paid,
        }
      );
      return res;
    } catch (error) {
      handleError(error);
    }
  };

  const toggleDelivered = async (delivered = true, purchaseId) => {
    try {
      const res = await axiosInstanceWithoutTimeout.patch(
        "/purchases/deliver/" + purchaseId,
        {
          delivered,
        }
      );
      return res;
    } catch (error) {
      handleError(error);
    }
  };

  return {
    subscribe,
    create,
    togglePay,
    toggleDelivered,
    getByConsumerId,
    get,
  };
}

export const purchase = createPurchase();
