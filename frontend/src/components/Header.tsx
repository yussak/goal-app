import Link from "next/link";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { useUser } from "@/contexts/userContext";

export default function Header() {
  const { user } = useUser();

  return (
    <header className="header">
      <LanguageSwitcher />
      <p>{user ? <span>{user.name} としてログイン</span> : "Not logged in"}</p>
      <p>{user && <span>userid（デバッグ用）: {user.id}</span>}</p>
    </header>
  );
}
