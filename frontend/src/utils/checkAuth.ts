import { useSession } from "next-auth/react";
import Router from "next/router";
import { useEffect } from "react";

export function checkAuth() {
  const { data: session, status } = useSession();

  // todo:ローディング画面実装→app routerでやりたい
  useEffect(() => {
    if (status === "loading") return;
    if (!session) {
      Router.push("/auth/login");
    }
  }, [session, status]);
}
