import axios from "axios";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Sidebar() {
  const router = useRouter();
  const { data: session } = useSession();

  const logout = async () => {
    // これでもログアウトはできる
    // でも2回クリックしないとできないしリロードしたらログインされてしまう
    // しかもこれだけだとtokenが消えない→不正利用の可能性があるらしい。なのでブラックリスト作成したりトークン削除が必要（要調査）
    try {
      await axios.post(
        process.env.NEXT_PUBLIC_API_URL + `/auth/logout`,
        {},
        { withCredentials: true }
      );
      // サーバーへのログアウトリクエスト成功後、クライアントサイドのCookieからトークンを削除
      document.cookie =
        "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      // login(null);
      router.push("/auth/login");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ul>
      {session?.user ? (
        <>
          {/* ログイン時のみ表示 */}
          <p>ログイン済み（デバッグ用）</p>
          <li>
            <Link href={`/users/${session.user.id}`}>mypage</Link>
          </li>
          <button onClick={logout}>ログアウト</button>
        </>
      ) : (
        <>
          {/* 美ログイン時のみ表示 */}
          <li>
            <Link href="/auth/signup">signup</Link>
          </li>
          <li>
            <Link href="/auth/login">login</Link>
          </li>
          <p>非ログイン（デバッグ用）</p>
        </>
      )}
      {/* 常に表示 */}
      <li>
        <Link href="/">Home</Link>
      </li>
      <li>
        <Link href="/goals">Goals</Link>
      </li>
      <li>
        <Link href="/users">ユーザー一覧</Link>
      </li>
      <li>
        <Link href="/about">About</Link>
      </li>
    </ul>
  );
}
