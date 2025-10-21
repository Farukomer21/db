import axios from "axios";

import { CONFIG } from "src/global-config";

const roomPricingAxiosInstance = axios.create({
  baseURL: CONFIG.roomPricingServiceUrl,
});

roomPricingAxiosInstance.interceptors.response.use(
  (response) => response,
  (error) =>
    Promise.reject(
      (error.response && error.response.data) || "Something went wrong!",
    ),
);

export default roomPricingAxiosInstance;

export const fetcher = async (args) => {
  try {
    const [url, config] = Array.isArray(args) ? args : [args];

    const res = await roomPricingAxiosInstance.get(url, { ...config });

    return res.data;
  } catch (error) {
    console.error("Failed to fetch:", error);
    throw error;
  }
};

export const roomPricingEndpoints = {
  roomPrice: {
    createRoomPrice: "/v1/roomprices",

    updateRoomPrice: "/v1/roomprices/:roomPriceId",

    deleteRoomPrice: "/v1/roomprices/:roomPriceId",

    getRoomPrice: "/v1/roomprices/:roomPriceId",

    listRoomPrices: "/v1/roomprices",
  },
};
