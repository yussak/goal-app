import Link from "next/link";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { useUser } from "@/contexts/userContext";

export default function Header() {
  const { user } = useUser();

  return (
    <header className="header">
      <LanguageSwitcher />
      {user ? <Link href={`/users/${user.id}`}>mypage</Link> : null}
      {user ? <p>{user.name} としてログイン</p> : "Not logged in"}
    </header>
  );
}
