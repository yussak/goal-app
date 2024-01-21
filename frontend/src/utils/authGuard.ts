import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

export function authGuard() {
  const { data: session, status } = useSession();
  const router = useRouter();

  console.log("sta", status);

  // todo:ローディング画面実装→app routerでやりたい
  // todo:以下だと中身が見えるので対応→そのためにもローディングが必要かもしれない
  useEffect(() => {
    // ログイン済の時はリダイレクトしない
    if (status === "loading") return;
    if (
      // 未ログインで認証が必要なページにアクセスしたらログインページにリダイレクトする
      status === "unauthenticated" &&
      router.pathname !== "/auth/signup" &&
      router.pathname !== "/auth/login"
    ) {
      router.push("/auth/login");
    }
    if (
      // ログイン済でログインまたは新規登録ページにアクセスしたらトップページにリダイレクトする
      status === "authenticated" &&
      (router.pathname === "/auth/login" || router.pathname === "/auth/signup")
    ) {
      router.push("/");
    }
  }, [session, status, router.pathname]);
}
