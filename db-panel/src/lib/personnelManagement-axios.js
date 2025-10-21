import axios from "axios";

import { CONFIG } from "src/global-config";

const personnelManagementAxiosInstance = axios.create({
  baseURL: CONFIG.personnelManagementServiceUrl,
});

personnelManagementAxiosInstance.interceptors.response.use(
  (response) => response,
  (error) =>
    Promise.reject(
      (error.response && error.response.data) || "Something went wrong!",
    ),
);

export default personnelManagementAxiosInstance;

export const fetcher = async (args) => {
  try {
    const [url, config] = Array.isArray(args) ? args : [args];

    const res = await personnelManagementAxiosInstance.get(url, { ...config });

    return res.data;
  } catch (error) {
    console.error("Failed to fetch:", error);
    throw error;
  }
};

export const personnelManagementEndpoints = {
  personnel: {
    createPersonnel: "/v1/personnels",

    updatePersonnel: "/v1/personnels/:personnelId",

    deletePersonnel: "/v1/personnels/:personnelId",

    getPersonnel: "/v1/personnels/:personnelId",

    listPersonnels: "/v1/personnels",
  },
};
