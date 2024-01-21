import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

export function authGuard() {
  const { status } = useSession();
  const router = useRouter();

  // todo:ローディング画面実装→app routerでやりたい
  // todo:以下だと中身が見えるので対応→そのためにもローディングが必要かもしれない
  useEffect(() => {
    // ログイン済の時はリダイレクトしない
    if (status === "loading") return;
    if (
      // 未ログインで認証が必要なページにアクセスしたらログインページにリダイレクトする
      // ログインまたは新規登録ページの時はリダイレクトしない
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
  }, [status, router]);
}
