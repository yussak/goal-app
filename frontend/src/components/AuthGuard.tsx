import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { ReactNode, useEffect } from "react";

const AuthGuard = ({ children }: { children: ReactNode }): any => {
  const { status } = useSession();
  const router = useRouter();

  // todo:以下だと中身が見えるので対応→そのためにもローディングが必要かもしれない
  useEffect(() => {
    if (
      // 未ログインで認証が必要なページにアクセスしたらログインページにリダイレクトする
      // ログインまたは新規登録ページの時はリダイレクトしない
      status === "unauthenticated" &&
      router.pathname !== "/auth/signup" &&
      router.pathname !== "/auth/login"
    ) {
      router.push("/auth/login");
    }
  }, [router, status]);
  if (status === "loading") return <p> loading</p>;
  // ログイン済の時はchildrenを表示する
  if (status === "authenticated") {
    return children;
  }
};

export default AuthGuard;
