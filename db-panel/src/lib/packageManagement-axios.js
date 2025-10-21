import axios from "axios";

import { CONFIG } from "src/global-config";

const packageManagementAxiosInstance = axios.create({
  baseURL: CONFIG.packageManagementServiceUrl,
});

packageManagementAxiosInstance.interceptors.response.use(
  (response) => response,
  (error) =>
    Promise.reject(
      (error.response && error.response.data) || "Something went wrong!",
    ),
);

export default packageManagementAxiosInstance;

export const fetcher = async (args) => {
  try {
    const [url, config] = Array.isArray(args) ? args : [args];

    const res = await packageManagementAxiosInstance.get(url, { ...config });

    return res.data;
  } catch (error) {
    console.error("Failed to fetch:", error);
    throw error;
  }
};

export const packageManagementEndpoints = {
  package_: {
    createPackage: "/v1/package_s",

    updatePackage: "/v1/package_s/:package_Id",

    getPackage: "/v1/package_s/:package_Id",

    deletePackage: "/v1/package_s/:package_Id",

    listPackages: "/v1/packages",
  },
};
