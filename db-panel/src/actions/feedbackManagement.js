import useSWR from "swr";
import { useMemo } from "react";

import {
  fetcher,
  feedbackManagementEndpoints,
} from "src/lib/feedbackManagement-axios";

// ----------------------------------------------------------------------

const swrOptions = {
  revalidateIfStale: false,
  revalidateOnFocus: false,
  revalidateOnReconnect: false,
  revalidateOnMount: true,
};

// ----------------------------------------------------------------------

export function useFeedbackManagementGetFeedback(feedbackId) {
  let url = feedbackId
    ? [feedbackManagementEndpoints.feedback.getFeedback]
    : "";

  url = url && url.map((u) => u.replace(":feedbackId", feedbackId));

  const { data, isLoading, error, isValidating } = useSWR(
    url,
    fetcher,
    swrOptions,
  );

  const memoizedValue = useMemo(
    () => ({
      feedback: data?.feedback,
      feedbackLoading: isLoading,
      feedbackError: error,
      feedbackValidating: isValidating,
    }),
    [data?.feedback, error, isLoading, isValidating],
  );

  return memoizedValue;
}

export function useFeedbackManagementListFeedbacks() {
  const url = [feedbackManagementEndpoints.feedback.listFeedbacks];

  const { data, isLoading, error, isValidating } = useSWR(url, fetcher, {
    ...swrOptions,
    keepPreviousData: true,
  });

  const memoizedValue = useMemo(
    () => ({
      searchResults: data?.feedbacks || [],
      searchLoading: isLoading,
      searchError: error,
      searchValidating: isValidating,
      searchEmpty: !isLoading && !isValidating && !data?.feedback?.length,
    }),
    [data?.feedback, error, isLoading, isValidating],
  );

  return memoizedValue;
}
