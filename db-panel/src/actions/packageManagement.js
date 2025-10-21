import useSWR from "swr";
import { useMemo } from "react";

import {
  fetcher,
  packageManagementEndpoints,
} from "src/lib/packageManagement-axios";

// ----------------------------------------------------------------------

const swrOptions = {
  revalidateIfStale: false,
  revalidateOnFocus: false,
  revalidateOnReconnect: false,
  revalidateOnMount: true,
};

// ----------------------------------------------------------------------

export function usePackageManagementGetPackage(package_Id) {
  let url = package_Id ? [packageManagementEndpoints.package_.getPackage] : "";

  url = url && url.map((u) => u.replace(":package_Id", package_Id));

  const { data, isLoading, error, isValidating } = useSWR(
    url,
    fetcher,
    swrOptions,
  );

  const memoizedValue = useMemo(
    () => ({
      package_: data?.package_,
      package_Loading: isLoading,
      package_Error: error,
      package_Validating: isValidating,
    }),
    [data?.package_, error, isLoading, isValidating],
  );

  return memoizedValue;
}

export function usePackageManagementListPackages() {
  const url = [packageManagementEndpoints.package_.listPackages];

  const { data, isLoading, error, isValidating } = useSWR(url, fetcher, {
    ...swrOptions,
    keepPreviousData: true,
  });

  const memoizedValue = useMemo(
    () => ({
      searchResults: data?.package_s || [],
      searchLoading: isLoading,
      searchError: error,
      searchValidating: isValidating,
      searchEmpty: !isLoading && !isValidating && !data?.package_?.length,
    }),
    [data?.package_, error, isLoading, isValidating],
  );

  return memoizedValue;
}
