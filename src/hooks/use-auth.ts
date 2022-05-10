import { LoginPayload } from "@/models";
import { authApi } from "api-client";
import useSWR from "swr";
import { PublicConfiguration } from "swr/dist/types";

export function useAuth(options?: Partial<PublicConfiguration>) {
  // auth
  const {
    data: auth,
    error,
    mutate,
  }: any = useSWR("/auth", {
    dedupingInterval: 60 * 60 * 1000,
    revalidateOnFocus: false, //1hr
    ...options,
  });

  const firstLoading = auth === undefined && error === undefined;

  async function login(payload: LoginPayload) {
    await authApi.login(payload);

    await mutate();
  }

  async function logout() {
    await authApi.logout();
    mutate(null, false);
  }
  return {
    auth,
    login,
    logout,
    mutateAuth: mutate,
    firstLoading,
  };
}
