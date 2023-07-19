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
      {user ? <Link href={`/users/${user.id}`}>mypage</Link> : null}
      {user ? <p>{user.name} </p> : "Not logged in"}
    </header>
  );
}
