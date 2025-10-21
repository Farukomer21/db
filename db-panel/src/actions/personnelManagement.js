import useSWR from "swr";
import { useMemo } from "react";

import {
  fetcher,
  personnelManagementEndpoints,
} from "src/lib/personnelManagement-axios";

// ----------------------------------------------------------------------

const swrOptions = {
  revalidateIfStale: false,
  revalidateOnFocus: false,
  revalidateOnReconnect: false,
  revalidateOnMount: true,
};

// ----------------------------------------------------------------------

export function usePersonnelManagementGetPersonnel(personnelId) {
  let url = personnelId
    ? [personnelManagementEndpoints.personnel.getPersonnel]
    : "";

  url = url && url.map((u) => u.replace(":personnelId", personnelId));

  const { data, isLoading, error, isValidating } = useSWR(
    url,
    fetcher,
    swrOptions,
  );

  const memoizedValue = useMemo(
    () => ({
      personnel: data?.personnel,
      personnelLoading: isLoading,
      personnelError: error,
      personnelValidating: isValidating,
    }),
    [data?.personnel, error, isLoading, isValidating],
  );

  return memoizedValue;
}

export function usePersonnelManagementListPersonnels() {
  const url = [personnelManagementEndpoints.personnel.listPersonnels];

  const { data, isLoading, error, isValidating } = useSWR(url, fetcher, {
    ...swrOptions,
    keepPreviousData: true,
  });

  const memoizedValue = useMemo(
    () => ({
      searchResults: data?.personnels || [],
      searchLoading: isLoading,
      searchError: error,
      searchValidating: isValidating,
      searchEmpty: !isLoading && !isValidating && !data?.personnel?.length,
    }),
    [data?.personnel, error, isLoading, isValidating],
  );

  return memoizedValue;
}
