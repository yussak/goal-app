import Link from "next/link";

export default function Header() {
  return (
    <header className="header">
      <Link href="/">Home</Link>
      <Link href="/about">About</Link>
      <Link href="/goals">Goals</Link>
    </header>
  );
}
