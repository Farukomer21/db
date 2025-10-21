import axios from "axios";

import { CONFIG } from "src/global-config";

const specialRequestManagementAxiosInstance = axios.create({
  baseURL: CONFIG.specialRequestManagementServiceUrl,
});

specialRequestManagementAxiosInstance.interceptors.response.use(
  (response) => response,
  (error) =>
    Promise.reject(
      (error.response && error.response.data) || "Something went wrong!",
    ),
);

export default specialRequestManagementAxiosInstance;

export const fetcher = async (args) => {
  try {
    const [url, config] = Array.isArray(args) ? args : [args];

    const res = await specialRequestManagementAxiosInstance.get(url, {
      ...config,
    });

    return res.data;
  } catch (error) {
    console.error("Failed to fetch:", error);
    throw error;
  }
};

export const specialRequestManagementEndpoints = {
  specialRequest: {
    createSpecialRequest: "/v1/specialrequests",

    updateSpecialRequest: "/v1/specialrequests/:specialRequestId",

    getSpecialRequest: "/v1/specialrequests/:specialRequestId",

    deleteSpecialRequest: "/v1/specialrequests/:specialRequestId",

    listSpecialRequests: "/v1/specialrequests",

    createSpecialRequestPublic: "/v1/specialrequestpublic",

    listSpecialRequestsByCode: "/v1/specialrequestsbycode",

    getSpecialRequestByCode: "/v1/specialrequestbycode/:specialRequestId",

    cancelSpecialRequestByCode:
      "/v1/cancelspecialrequestbycode/:specialRequestId",
  },
};
