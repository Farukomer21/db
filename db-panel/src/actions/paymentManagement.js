import useSWR from "swr";
import { useMemo } from "react";

import {
  fetcher,
  paymentManagementEndpoints,
} from "src/lib/paymentManagement-axios";

// ----------------------------------------------------------------------

const swrOptions = {
  revalidateIfStale: false,
  revalidateOnFocus: false,
  revalidateOnReconnect: false,
  revalidateOnMount: true,
};

// ----------------------------------------------------------------------

export function usePaymentManagementGetPayment(paymentId) {
  let url = paymentId ? [paymentManagementEndpoints.payment.getPayment] : "";

  url = url && url.map((u) => u.replace(":paymentId", paymentId));

  const { data, isLoading, error, isValidating } = useSWR(
    url,
    fetcher,
    swrOptions,
  );

  const memoizedValue = useMemo(
    () => ({
      payment: data?.payment,
      paymentLoading: isLoading,
      paymentError: error,
      paymentValidating: isValidating,
    }),
    [data?.payment, error, isLoading, isValidating],
  );

  return memoizedValue;
}

export function usePaymentManagementListPayments() {
  const url = [paymentManagementEndpoints.payment.listPayments];

  const { data, isLoading, error, isValidating } = useSWR(url, fetcher, {
    ...swrOptions,
    keepPreviousData: true,
  });

  const memoizedValue = useMemo(
    () => ({
      searchResults: data?.payments || [],
      searchLoading: isLoading,
      searchError: error,
      searchValidating: isValidating,
      searchEmpty: !isLoading && !isValidating && !data?.payment?.length,
    }),
    [data?.payment, error, isLoading, isValidating],
  );

  return memoizedValue;
}
