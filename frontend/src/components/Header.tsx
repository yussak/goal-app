import { LanguageSwitcher } from "./LanguageSwitcher";
import { useSession } from "next-auth/react";

export default function Header() {
  const { data: session } = useSession();

  return (
    <header className="header">
      <LanguageSwitcher />
      {session?.user?.name && <p>Login as {session?.user?.name}</p>}
    </header>
  );
}
