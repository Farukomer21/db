import useSWR from "swr";
import { useMemo } from "react";

import {
  fetcher,
  specialRequestManagementEndpoints,
} from "src/lib/specialRequestManagement-axios";

// ----------------------------------------------------------------------

const swrOptions = {
  revalidateIfStale: false,
  revalidateOnFocus: false,
  revalidateOnReconnect: false,
  revalidateOnMount: true,
};

// ----------------------------------------------------------------------

export function useSpecialRequestManagementGetSpecialRequest(specialRequestId) {
  let url = specialRequestId
    ? [specialRequestManagementEndpoints.specialRequest.getSpecialRequest]
    : "";

  url = url && url.map((u) => u.replace(":specialRequestId", specialRequestId));

  const { data, isLoading, error, isValidating } = useSWR(
    url,
    fetcher,
    swrOptions,
  );

  const memoizedValue = useMemo(
    () => ({
      specialRequest: data?.specialRequest,
      specialRequestLoading: isLoading,
      specialRequestError: error,
      specialRequestValidating: isValidating,
    }),
    [data?.specialRequest, error, isLoading, isValidating],
  );

  return memoizedValue;
}

export function useSpecialRequestManagementGetSpecialRequestByCode(
  specialRequestId,
) {
  let url = specialRequestId
    ? [specialRequestManagementEndpoints.specialRequest.getSpecialRequestByCode]
    : "";

  url = url && url.map((u) => u.replace(":specialRequestId", specialRequestId));

  const { data, isLoading, error, isValidating } = useSWR(
    url,
    fetcher,
    swrOptions,
  );

  const memoizedValue = useMemo(
    () => ({
      specialRequest: data?.specialRequest,
      specialRequestLoading: isLoading,
      specialRequestError: error,
      specialRequestValidating: isValidating,
    }),
    [data?.specialRequest, error, isLoading, isValidating],
  );

  return memoizedValue;
}

export function useSpecialRequestManagementListSpecialRequests() {
  const url = [
    specialRequestManagementEndpoints.specialRequest.listSpecialRequests,
  ];

  const { data, isLoading, error, isValidating } = useSWR(url, fetcher, {
    ...swrOptions,
    keepPreviousData: true,
  });

  const memoizedValue = useMemo(
    () => ({
      searchResults: data?.specialRequests || [],
      searchLoading: isLoading,
      searchError: error,
      searchValidating: isValidating,
      searchEmpty: !isLoading && !isValidating && !data?.specialRequest?.length,
    }),
    [data?.specialRequest, error, isLoading, isValidating],
  );

  return memoizedValue;
}

export function useSpecialRequestManagementListSpecialRequestsByCode() {
  const url = [
    specialRequestManagementEndpoints.specialRequest.listSpecialRequestsByCode,
  ];

  const { data, isLoading, error, isValidating } = useSWR(url, fetcher, {
    ...swrOptions,
    keepPreviousData: true,
  });

  const memoizedValue = useMemo(
    () => ({
      searchResults: data?.specialRequests || [],
      searchLoading: isLoading,
      searchError: error,
      searchValidating: isValidating,
      searchEmpty: !isLoading && !isValidating && !data?.specialRequest?.length,
    }),
    [data?.specialRequest, error, isLoading, isValidating],
  );

  return memoizedValue;
}
