import axios from "axios";

import { CONFIG } from "src/global-config";

const guestManagementAxiosInstance = axios.create({
  baseURL: CONFIG.guestManagementServiceUrl,
});

guestManagementAxiosInstance.interceptors.response.use(
  (response) => response,
  (error) =>
    Promise.reject(
      (error.response && error.response.data) || "Something went wrong!",
    ),
);

export default guestManagementAxiosInstance;

export const fetcher = async (args) => {
  try {
    const [url, config] = Array.isArray(args) ? args : [args];

    const res = await guestManagementAxiosInstance.get(url, { ...config });

    return res.data;
  } catch (error) {
    console.error("Failed to fetch:", error);
    throw error;
  }
};

export const guestManagementEndpoints = {
  guest: {
    createGuest: "/v1/guests",

    updateGuest: "/v1/guests/:guestId",

    getGuest: "/v1/guests/:guestId",

    deleteGuest: "/v1/guests/:guestId",

    listGuests: "/v1/guests",
  },
};
