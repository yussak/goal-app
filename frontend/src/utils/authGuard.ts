import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

export function authGuard() {
  const { data: session, status } = useSession();
  const router = useRouter();

  // todo:ローディング画面実装→app routerでやりたい
  // todo:以下だと中身が見えるので対応→そのためにもローディングが必要かもしれない
  useEffect(() => {
    // ログイン済の時はリダイレクトしない
    if (status === "loading" || session) return;
    if (
      router.pathname !== "/auth/signup" &&
      router.pathname !== "/auth/login"
    ) {
      router.push("/auth/login");
    }
  }, [session, status, router.pathname]);
}
