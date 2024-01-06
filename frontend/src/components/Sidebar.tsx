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
          <li>
            {/* ログイン時のみ表示 */}
            {/* ログアウト時にログイン画面にリダイレクト */}
            <button onClick={() => signOut({ callbackUrl: "/auth/login" })}>
              ログアウト
            </button>
          </li>
          <li>
            <Link href="/goals/create">create goal</Link>
          </li>
          <li>
            <Link href="/goals">Goals</Link>
          </li>
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
        </>
      )}
      {/* 常に表示 */}
      <li>
        <Link href="/">Home</Link>
      </li>
      <li>
        <Link href="/about">About</Link>
      </li>
    </ul>
  );
}
