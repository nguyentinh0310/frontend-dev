import useSWR from "swr";

export function useUser(id: any) {
  const { data, mutate, error } = useSWR(id ? `/users/${id}` : null);
  return {
    user: data,
    isLoading: !error && !data,
    isError: error,
    mutateUser: mutate,
  };
}

export function useSearchUser(keyword: string) {
  const { data, error } = useSWR(`/users/search?keyword=${encodeURIComponent(keyword)}`);
  return {
    userSearch: data,
    isLoading: !error && !data,
    isError: error,
  };
}

export function useSuggestUser() {
  const { data, error, mutate } = useSWR(`/users/suggest_user?num=6`);
  return {
    userSuggest: data,
    isLoading: !error && !data,
    isError: error,
    mutateUserSuggest: mutate,
  };
}
