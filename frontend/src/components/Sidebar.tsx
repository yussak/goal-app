import { useUser } from "@/contexts/userContext";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Sidebar() {
  const { user, login } = useUser();
  const router = useRouter();

  const logout = async () => {
    try {
      await axios.post(
        process.env.NEXT_PUBLIC_API_URL + `/auth/logout`,
        {},
        { withCredentials: true }
      );
      login(null);
      router.push("/auth/login");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ul>
      {/* 美ログイン時のみ表示 */}
      {!user ? (
        <>
          <li>
            <Link href="/auth/signup">signup</Link>
          </li>
          <li>
            <Link href="/auth/login">login</Link>
          </li>
          <p>非ログイン（デバッグ用）</p>
        </>
      ) : (
        <>
          {/* ログイン時のみ表示 */}
          <p>ログイン済み（デバッグ用）</p>
          {/* TODO:実装 */}
          <button onClick={logout}>ログアウト</button>
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
