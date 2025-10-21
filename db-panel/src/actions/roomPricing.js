import useSWR from "swr";
import { useMemo } from "react";

import { fetcher, roomPricingEndpoints } from "src/lib/roomPricing-axios";

// ----------------------------------------------------------------------

const swrOptions = {
  revalidateIfStale: false,
  revalidateOnFocus: false,
  revalidateOnReconnect: false,
  revalidateOnMount: true,
};

// ----------------------------------------------------------------------

export function useRoomPricingGetRoomPrice(roomPriceId) {
  let url = roomPriceId ? [roomPricingEndpoints.roomPrice.getRoomPrice] : "";

  url = url && url.map((u) => u.replace(":roomPriceId", roomPriceId));

  const { data, isLoading, error, isValidating } = useSWR(
    url,
    fetcher,
    swrOptions,
  );

  const memoizedValue = useMemo(
    () => ({
      roomPrice: data?.roomPrice,
      roomPriceLoading: isLoading,
      roomPriceError: error,
      roomPriceValidating: isValidating,
    }),
    [data?.roomPrice, error, isLoading, isValidating],
  );

  return memoizedValue;
}

export function useRoomPricingListRoomPrices() {
  const url = [roomPricingEndpoints.roomPrice.listRoomPrices];

  const { data, isLoading, error, isValidating } = useSWR(url, fetcher, {
    ...swrOptions,
    keepPreviousData: true,
  });

  const memoizedValue = useMemo(
    () => ({
      searchResults: data?.roomPrices || [],
      searchLoading: isLoading,
      searchError: error,
      searchValidating: isValidating,
      searchEmpty: !isLoading && !isValidating && !data?.roomPrice?.length,
    }),
    [data?.roomPrice, error, isLoading, isValidating],
  );

  return memoizedValue;
}
