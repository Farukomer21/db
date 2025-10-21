import axios from "axios";

import { CONFIG } from "src/global-config";

const paymentManagementAxiosInstance = axios.create({
  baseURL: CONFIG.paymentManagementServiceUrl,
});

paymentManagementAxiosInstance.interceptors.response.use(
  (response) => response,
  (error) =>
    Promise.reject(
      (error.response && error.response.data) || "Something went wrong!",
    ),
);

export default paymentManagementAxiosInstance;

export const fetcher = async (args) => {
  try {
    const [url, config] = Array.isArray(args) ? args : [args];

    const res = await paymentManagementAxiosInstance.get(url, { ...config });

    return res.data;
  } catch (error) {
    console.error("Failed to fetch:", error);
    throw error;
  }
};

export const paymentManagementEndpoints = {
  payment: {
    createPayment: "/v1/payments",

    updatePayment: "/v1/payments/:paymentId",

    deletePayment: "/v1/payments/:paymentId",

    getPayment: "/v1/payments/:paymentId",

    listPayments: "/v1/payments",
  },
};
