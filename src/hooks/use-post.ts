import useSWR from "swr";

export function usePosts(limit?: number) {
  let url = `/posts`;
  if (limit) {
    url = `${url}?limit=${limit}`;
  }
  const { data, error, mutate } = useSWR(url);
  return {
    posts: data,
    isLoading: !error && !data,
    isError: error,
    mutatePosts: mutate,
  };
}

export function usePost(id: any) {
  const { data, error, mutate } = useSWR(id ? `/posts/${id}` : null);
  return {
    post: data,
    isLoading: !error && !data,
    isError: error,
    mutatePost: mutate,
  };
}

export function usePostUser(id: any) {
  const { data, error, mutate } = useSWR(id ? `/posts/user-posts/${id}` : null);
  return {
    postUser: data,
    isLoading: !error && !data,
    isError: error,
    mutatePostUser: mutate,
  };
}

export function usePostsFollow(limit?: number) {
  let url = `/posts/follow`;
  if (limit) {
    url = `${url}?limit=${limit}`;
  }
  const { data, error, mutate } = useSWR(url);
  return {
    postsFollow: data,
    isLoading: !error && !data,
    isError: error,
    mutatePostsFl: mutate,
  };
}
