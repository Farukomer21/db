import axios from "axios";

import { CONFIG } from "src/global-config";

const feedbackManagementAxiosInstance = axios.create({
  baseURL: CONFIG.feedbackManagementServiceUrl,
});

feedbackManagementAxiosInstance.interceptors.response.use(
  (response) => response,
  (error) =>
    Promise.reject(
      (error.response && error.response.data) || "Something went wrong!",
    ),
);

export default feedbackManagementAxiosInstance;

export const fetcher = async (args) => {
  try {
    const [url, config] = Array.isArray(args) ? args : [args];

    const res = await feedbackManagementAxiosInstance.get(url, { ...config });

    return res.data;
  } catch (error) {
    console.error("Failed to fetch:", error);
    throw error;
  }
};

export const feedbackManagementEndpoints = {
  feedback: {
    createFeedbackGuest: "/v1/feedbackguest",

    getFeedback: "/v1/feedbacks/:feedbackId",

    updateFeedback: "/v1/feedbacks/:feedbackId",

    deleteFeedback: "/v1/feedbacks/:feedbackId",

    listFeedbacks: "/v1/feedbacks",
  },
};
