import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Sidebar() {
  const router = useRouter();
  const { data: session } = useSession();

  return (
    <ul>
      {session?.user ? (
        <>
          {/* ログイン時のみ表示 */}
          <p>ログイン済み（デバッグ用）</p>
          <li>
            <Link href={`/users/${session.user.id}`}>mypage</Link>
          </li>
          {/* ログアウト時にログイン画面にリダイレクト */}
          <button onClick={() => signOut({ callbackUrl: "/login" })}>
            ログアウト
          </button>
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
