import useSWR from "swr";
import { useMemo } from "react";

import {
  fetcher,
  guestManagementEndpoints,
} from "src/lib/guestManagement-axios";

// ----------------------------------------------------------------------

const swrOptions = {
  revalidateIfStale: false,
  revalidateOnFocus: false,
  revalidateOnReconnect: false,
  revalidateOnMount: true,
};

// ----------------------------------------------------------------------

export function useGuestManagementGetGuest(guestId) {
  let url = guestId ? [guestManagementEndpoints.guest.getGuest] : "";

  url = url && url.map((u) => u.replace(":guestId", guestId));

  const { data, isLoading, error, isValidating } = useSWR(
    url,
    fetcher,
    swrOptions,
  );

  const memoizedValue = useMemo(
    () => ({
      guest: data?.guest,
      guestLoading: isLoading,
      guestError: error,
      guestValidating: isValidating,
    }),
    [data?.guest, error, isLoading, isValidating],
  );

  return memoizedValue;
}

export function useGuestManagementListGuests() {
  const url = [guestManagementEndpoints.guest.listGuests];

  const { data, isLoading, error, isValidating } = useSWR(url, fetcher, {
    ...swrOptions,
    keepPreviousData: true,
  });

  const memoizedValue = useMemo(
    () => ({
      searchResults: data?.guests || [],
      searchLoading: isLoading,
      searchError: error,
      searchValidating: isValidating,
      searchEmpty: !isLoading && !isValidating && !data?.guest?.length,
    }),
    [data?.guest, error, isLoading, isValidating],
  );

  return memoizedValue;
}
