import useSWR from "swr";

export function useConversations() {
  const { data, error, mutate } = useSWR(`/conversations`);
  return {
    conversations: data,
    isLoading: !error && !data,
    isError: error,
    mutateConv: mutate,
  };
}

export function useMessages(id: any) {
  const { data, error, mutate } = useSWR(id ? `/messages/${id}` : null);
  return {
    messages: data,
    isLoading: !error && !data,
    isError: error,
    mutateMessages: mutate,
  };
}
