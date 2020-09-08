import { writable } from "svelte/store";
import { axiosInstance, handleError } from "../api";
import ConsumerLocation, {
  fromApiToConsumerLocationList,
} from "../models/ConsumerLocation";

function createConsumer() {
  const { subscribe, set } = writable(false);

  const createLocation = async (consumerLocation = ConsumerLocation()) => {
    try {
      const res = await axiosInstance.post(
        "/consumer-locations",
        consumerLocation
      );

      return res.data.value;
    } catch (error) {
      handleError(error);
    }
  };

  const deleteLocation = async (consumerLocationId = 0) => {
    try {
      const res = await axiosInstance.delete(
        "/consumer-locations/" + consumerLocationId
      );
      return res.data.value;
    } catch (error) {
      handleError(error);
    }
  };

  const getConsumerLocations = async (consumerId = 0) => {
    try {
      const res = await axiosInstance.get(
        "/consumer-locations/consumer/" + consumerId
      );
      const locations = fromApiToConsumerLocationList(res.data.value);
      return locations;
    } catch (error) {
      handleError(error);
    }
  };

  return {
    subscribe,
	createLocation,
	deleteLocation,
    getConsumerLocations,
  };
}

export const consumer = createConsumer();
