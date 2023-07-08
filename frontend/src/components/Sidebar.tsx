import Link from "next/link";

export default function Sidebar() {
  return (
    <ul>
      <li>
        <Link href="/auth/signup">signup</Link>
      </li>
      <li>
        <Link href="/auth/login">login</Link>
      </li>
    </ul>
  );
}
