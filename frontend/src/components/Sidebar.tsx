import { useUser } from "@/contexts/userContext";
import Link from "next/link";

export default function Sidebar() {
  const { user } = useUser();

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
        // ログイン時のみ表示
        <p>ログイン済み（デバッグ用）</p>
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
