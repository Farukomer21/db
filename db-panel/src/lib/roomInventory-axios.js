import axios from "axios";

import { CONFIG } from "src/global-config";

const roomInventoryAxiosInstance = axios.create({
  baseURL: CONFIG.roomInventoryServiceUrl,
});

roomInventoryAxiosInstance.interceptors.response.use(
  (response) => response,
  (error) =>
    Promise.reject(
      (error.response && error.response.data) || "Something went wrong!",
    ),
);

export default roomInventoryAxiosInstance;

export const fetcher = async (args) => {
  try {
    const [url, config] = Array.isArray(args) ? args : [args];

    const res = await roomInventoryAxiosInstance.get(url, { ...config });

    return res.data;
  } catch (error) {
    console.error("Failed to fetch:", error);
    throw error;
  }
};

export const roomInventoryEndpoints = {
  room: {
    updateRoom: "/v1/rooms/:roomId",

    getRoom: "/v1/rooms/:roomId",

    deleteRoom: "/v1/rooms/:roomId",

    listRooms: "/v1/rooms",

    listAvailableRooms: "/v1/availablerooms",
  },
};
