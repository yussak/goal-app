import Link from "next/link";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { useUser } from "@/contexts/userContext";

export default function Header() {
  const { user } = useUser();

  return (
    <header className="header">
      <Link href="/">Home</Link>
      <Link href="/about">About</Link>
      <Link href="/goals">Goals</Link>
      <LanguageSwitcher />
      {user ? <p>{user.name} desu</p> : "ログインしてない"}
    </header>
  );
}
