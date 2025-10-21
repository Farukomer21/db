import useSWR from "swr";
import { useMemo } from "react";

import { fetcher, authEndpoints } from "src/lib/auth-axios";

// ----------------------------------------------------------------------

const swrOptions = {
  revalidateIfStale: false,
  revalidateOnFocus: false,
  revalidateOnReconnect: false,
  revalidateOnMount: true,
};

// ----------------------------------------------------------------------

export function useAuthGetUser(userId) {
  let url = userId ? [authEndpoints.user.getUser] : "";

  url = url && url.map((u) => u.replace(":userId", userId));

  const { data, isLoading, error, isValidating } = useSWR(
    url,
    fetcher,
    swrOptions,
  );

  const memoizedValue = useMemo(
    () => ({
      user: data?.user,
      userLoading: isLoading,
      userError: error,
      userValidating: isValidating,
    }),
    [data?.user, error, isLoading, isValidating],
  );

  return memoizedValue;
}

export function useAuthGetBriefUser(userId) {
  let url = userId ? [authEndpoints.user.getBriefUser] : "";

  url = url && url.map((u) => u.replace(":userId", userId));

  const { data, isLoading, error, isValidating } = useSWR(
    url,
    fetcher,
    swrOptions,
  );

  const memoizedValue = useMemo(
    () => ({
      user: data?.user,
      userLoading: isLoading,
      userError: error,
      userValidating: isValidating,
    }),
    [data?.user, error, isLoading, isValidating],
  );

  return memoizedValue;
}

export function useAuthListUsers() {
  const url = [authEndpoints.user.listUsers];

  const { data, isLoading, error, isValidating } = useSWR(url, fetcher, {
    ...swrOptions,
    keepPreviousData: true,
  });

  const memoizedValue = useMemo(
    () => ({
      searchResults: data?.users || [],
      searchLoading: isLoading,
      searchError: error,
      searchValidating: isValidating,
      searchEmpty: !isLoading && !isValidating && !data?.user?.length,
    }),
    [data?.user, error, isLoading, isValidating],
  );

  return memoizedValue;
}
