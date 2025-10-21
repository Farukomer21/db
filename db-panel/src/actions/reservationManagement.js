import useSWR from "swr";
import { useMemo } from "react";

import {
  fetcher,
  reservationManagementEndpoints,
} from "src/lib/reservationManagement-axios";

// ----------------------------------------------------------------------

const swrOptions = {
  revalidateIfStale: false,
  revalidateOnFocus: false,
  revalidateOnReconnect: false,
  revalidateOnMount: true,
};

// ----------------------------------------------------------------------

export function useReservationManagementGetReservation(reservationId) {
  let url = reservationId
    ? [reservationManagementEndpoints.reservation.getReservation]
    : "";

  url = url && url.map((u) => u.replace(":reservationId", reservationId));

  const { data, isLoading, error, isValidating } = useSWR(
    url,
    fetcher,
    swrOptions,
  );

  const memoizedValue = useMemo(
    () => ({
      reservation: data?.reservation,
      reservationLoading: isLoading,
      reservationError: error,
      reservationValidating: isValidating,
    }),
    [data?.reservation, error, isLoading, isValidating],
  );

  return memoizedValue;
}

export function useReservationManagementGetReservationByCode(reservationId) {
  let url = reservationId
    ? [reservationManagementEndpoints.reservation.getReservationByCode]
    : "";

  url = url && url.map((u) => u.replace(":reservationId", reservationId));

  const { data, isLoading, error, isValidating } = useSWR(
    url,
    fetcher,
    swrOptions,
  );

  const memoizedValue = useMemo(
    () => ({
      reservation: data?.reservation,
      reservationLoading: isLoading,
      reservationError: error,
      reservationValidating: isValidating,
    }),
    [data?.reservation, error, isLoading, isValidating],
  );

  return memoizedValue;
}

export function useReservationManagementListReservations() {
  const url = [reservationManagementEndpoints.reservation.listReservations];

  const { data, isLoading, error, isValidating } = useSWR(url, fetcher, {
    ...swrOptions,
    keepPreviousData: true,
  });

  const memoizedValue = useMemo(
    () => ({
      searchResults: data?.reservations || [],
      searchLoading: isLoading,
      searchError: error,
      searchValidating: isValidating,
      searchEmpty: !isLoading && !isValidating && !data?.reservation?.length,
    }),
    [data?.reservation, error, isLoading, isValidating],
  );

  return memoizedValue;
}
