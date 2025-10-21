import useSWR from "swr";
import { useMemo } from "react";

import {
  fetcher,
  packageReservationMappingEndpoints,
} from "src/lib/packageReservationMapping-axios";

// ----------------------------------------------------------------------

const swrOptions = {
  revalidateIfStale: false,
  revalidateOnFocus: false,
  revalidateOnReconnect: false,
  revalidateOnMount: true,
};

// ----------------------------------------------------------------------

export function usePackageReservationMappingGetPackageReservation(
  packageReservationId,
) {
  let url = packageReservationId
    ? [
        packageReservationMappingEndpoints.packageReservation
          .getPackageReservation,
      ]
    : "";

  url =
    url &&
    url.map((u) => u.replace(":packageReservationId", packageReservationId));

  const { data, isLoading, error, isValidating } = useSWR(
    url,
    fetcher,
    swrOptions,
  );

  const memoizedValue = useMemo(
    () => ({
      packageReservation: data?.packageReservation,
      packageReservationLoading: isLoading,
      packageReservationError: error,
      packageReservationValidating: isValidating,
    }),
    [data?.packageReservation, error, isLoading, isValidating],
  );

  return memoizedValue;
}

export function usePackageReservationMappingListPackageReservations() {
  const url = [
    packageReservationMappingEndpoints.packageReservation
      .listPackageReservations,
  ];

  const { data, isLoading, error, isValidating } = useSWR(url, fetcher, {
    ...swrOptions,
    keepPreviousData: true,
  });

  const memoizedValue = useMemo(
    () => ({
      searchResults: data?.packageReservations || [],
      searchLoading: isLoading,
      searchError: error,
      searchValidating: isValidating,
      searchEmpty:
        !isLoading && !isValidating && !data?.packageReservation?.length,
    }),
    [data?.packageReservation, error, isLoading, isValidating],
  );

  return memoizedValue;
}
