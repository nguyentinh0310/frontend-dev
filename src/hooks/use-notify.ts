import useSWR from "swr";

export function useNotify() {
  const { data, error, mutate } = useSWR(`/notification`);
  return {
    notifies: data,
    isLoading: !error && !data,
    isError: error,
    mutateNotify: mutate,
  };
}
