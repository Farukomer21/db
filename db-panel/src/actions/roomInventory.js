import useSWR from "swr";
import { useMemo } from "react";

import { fetcher, roomInventoryEndpoints } from "src/lib/roomInventory-axios";

// ----------------------------------------------------------------------

const swrOptions = {
  revalidateIfStale: false,
  revalidateOnFocus: false,
  revalidateOnReconnect: false,
  revalidateOnMount: true,
};

// ----------------------------------------------------------------------

export function useRoomInventoryGetRoom(roomId) {
  let url = roomId ? [roomInventoryEndpoints.room.getRoom] : "";

  url = url && url.map((u) => u.replace(":roomId", roomId));

  const { data, isLoading, error, isValidating } = useSWR(
    url,
    fetcher,
    swrOptions,
  );

  const memoizedValue = useMemo(
    () => ({
      room: data?.room,
      roomLoading: isLoading,
      roomError: error,
      roomValidating: isValidating,
    }),
    [data?.room, error, isLoading, isValidating],
  );

  return memoizedValue;
}

export function useRoomInventoryListRooms() {
  const url = [roomInventoryEndpoints.room.listRooms];

  const { data, isLoading, error, isValidating } = useSWR(url, fetcher, {
    ...swrOptions,
    keepPreviousData: true,
  });

  const memoizedValue = useMemo(
    () => ({
      searchResults: data?.rooms || [],
      searchLoading: isLoading,
      searchError: error,
      searchValidating: isValidating,
      searchEmpty: !isLoading && !isValidating && !data?.room?.length,
    }),
    [data?.room, error, isLoading, isValidating],
  );

  return memoizedValue;
}

export function useRoomInventoryListAvailableRooms() {
  const url = [roomInventoryEndpoints.room.listAvailableRooms];

  const { data, isLoading, error, isValidating } = useSWR(url, fetcher, {
    ...swrOptions,
    keepPreviousData: true,
  });

  const memoizedValue = useMemo(
    () => ({
      searchResults: data?.rooms || [],
      searchLoading: isLoading,
      searchError: error,
      searchValidating: isValidating,
      searchEmpty: !isLoading && !isValidating && !data?.room?.length,
    }),
    [data?.room, error, isLoading, isValidating],
  );

  return memoizedValue;
}
