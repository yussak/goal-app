import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { ReactNode, useEffect } from "react";

const AuthGuard = ({ children }: { children: ReactNode }): any => {
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (
      // 未ログインで認証が必要なページにアクセスしたらログインページにリダイレクトする
      // ログインページの時はリダイレクトしない
      status === "unauthenticated" &&
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
