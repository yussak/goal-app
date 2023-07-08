import Link from "next/link";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { UserContext } from "@/contexts/userContext";
import { useContext } from "react";

export default function Header() {
  const { user } = useContext(UserContext);

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
