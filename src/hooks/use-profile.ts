import useSWR from "swr";

export function useProfile(id:any) {
  const { data, error, mutate } = useSWR(`/profile/${id}`);

  return {
    profile: data,
    isLoading: !error && !data,
    isError: error,
    mutate,
  };
}
