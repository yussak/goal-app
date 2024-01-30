import { useSession } from "next-auth/react";

export default function Header() {
  const { data: session } = useSession();

  return (
    <header className="header">
      <h1>goal-app</h1>
      {session?.user?.name && <p>Login as {session?.user?.name}</p>}
    </header>
  );
}
