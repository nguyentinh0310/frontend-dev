import { useAuth } from "@/hooks";
import { useRouter } from "next/dist/client/router";
import React, { useEffect } from "react";
import { Loading } from "./loading";

export interface AuthProps {
  children: any;
}

export function Auth({ children }: AuthProps) {
  const router = useRouter();
  const { auth, firstLoading } = useAuth();

  useEffect(() => {
    if (!firstLoading && !auth) router.push("/login");
  }, [router, auth, firstLoading]);

  if (!auth) return <Loading />;

  return <div>{children}</div>;
}
