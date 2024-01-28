import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { ReactNode, useEffect } from "react";

const AuthGuard = ({ children }: { children: ReactNode }): any => {
  const { status } = useSession();
  const router = useRouter();

  // todo:ローディング画面実装→app routerでやりたい
  // todo:以下だと中身が見えるので対応→そのためにもローディングが必要かもしれない
  useEffect(() => {
    // ログイン済の時はリダイレクトしない
    // if (status === "loading") return;
    if (
      // 未ログインで認証が必要なページにアクセスしたらログインページにリダイレクトする
      // ログインまたは新規登録ページの時はリダイレクトしない
      status === "unauthenticated" &&
      router.pathname !== "/auth/signup" &&
      router.pathname !== "/auth/login"
    ) {
      router.push("/auth/login");
    }
    // if (
    //   // ログイン済でログインまたは新規登録ページにアクセスしたらトップページにリダイレクトする
    //   status === "authenticated" &&
    //   (router.pathname === "/auth/login" || router.pathname === "/auth/signup")
    // ) {
    //   router.push("/");
    // }
  }, [router, status]);
  if (status === "loading") return <p> loading</p>;
  // ログイン済でログインまたは新規登録ページにアクセスしたらトップページにリダイレクトする
  if (status === "authenticated") {
    return children;
  }
};

export default AuthGuard;
