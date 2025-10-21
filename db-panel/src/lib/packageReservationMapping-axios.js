import axios from "axios";

import { CONFIG } from "src/global-config";

const packageReservationMappingAxiosInstance = axios.create({
  baseURL: CONFIG.packageReservationMappingServiceUrl,
});

packageReservationMappingAxiosInstance.interceptors.response.use(
  (response) => response,
  (error) =>
    Promise.reject(
      (error.response && error.response.data) || "Something went wrong!",
    ),
);

export default packageReservationMappingAxiosInstance;

export const fetcher = async (args) => {
  try {
    const [url, config] = Array.isArray(args) ? args : [args];

    const res = await packageReservationMappingAxiosInstance.get(url, {
      ...config,
    });

    return res.data;
  } catch (error) {
    console.error("Failed to fetch:", error);
    throw error;
  }
};

export const packageReservationMappingEndpoints = {
  packageReservation: {
    createPackageReservation: "/v1/packagereservations",

    updatePackageReservation: "/v1/packagereservations/:packageReservationId",

    deletePackageReservation: "/v1/packagereservations/:packageReservationId",

    getPackageReservation: "/v1/packagereservations/:packageReservationId",

    listPackageReservations: "/v1/packagereservations",
  },
};
