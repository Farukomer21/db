import axios from "axios";

import { CONFIG } from "src/global-config";

const reservationManagementAxiosInstance = axios.create({
  baseURL: CONFIG.reservationManagementServiceUrl,
});

reservationManagementAxiosInstance.interceptors.response.use(
  (response) => response,
  (error) =>
    Promise.reject(
      (error.response && error.response.data) || "Something went wrong!",
    ),
);

export default reservationManagementAxiosInstance;

export const fetcher = async (args) => {
  try {
    const [url, config] = Array.isArray(args) ? args : [args];

    const res = await reservationManagementAxiosInstance.get(url, {
      ...config,
    });

    return res.data;
  } catch (error) {
    console.error("Failed to fetch:", error);
    throw error;
  }
};

export const reservationManagementEndpoints = {
  reservation: {
    createReservation: "/v1/reservations",

    updateReservation: "/v1/reservations/:reservationId",

    getReservation: "/v1/reservations/:reservationId",

    deleteReservation: "/v1/reservations/:reservationId",

    listReservations: "/v1/reservations",

    createReservationGuest: "/v1/reservationguest",

    confirmReservationPayment: "/v1/confirmreservationpayment/:reservationId",

    getReservationByCode: "/v1/reservationbycode/:reservationId",

    updateReservationByCode: "/v1/reservationbycode/:reservationId",

    cancelReservationByCode: "/v1/cancelreservationbycode/:reservationId",
  },
};
