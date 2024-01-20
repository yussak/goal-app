import Link from "next/link";
import { useSession } from "next-auth/react";
import HomeIcon from "@mui/icons-material/Home";

export default function Header() {
  const { data: session } = useSession();

  return (
    <header className="header">
      <Link href="/">
        <HomeIcon />
      </Link>
      {session?.user?.name && <p>Login as {session?.user?.name}</p>}
    </header>
  );
}
