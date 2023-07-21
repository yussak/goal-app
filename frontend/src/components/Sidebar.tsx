import { useUser } from "@/contexts/userContext";
import Link from "next/link";

export default function Sidebar() {
  const { user } = useUser();

  return (
    <ul>
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
        <p>ログイン済み（デバッグ用）</p>
      )}
      <li>
        <Link href="/users">ユーザー一覧</Link>
      </li>
    </ul>
  );
}
