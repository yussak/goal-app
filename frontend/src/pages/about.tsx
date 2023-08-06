import { useSession } from "next-auth/react";

export default function About() {
  const { data: session } = useSession();

  return (
    <>
      {/* TODO:nameが空文字の時もfalsyになるのでHelloが出てこない→正しいんだがそもそもnameが空欄にならぬようバリデーション追加する */}
      {/* 一貫性を保つためpタグでもオプショナルチェーンで書いてる */}
      {session?.user?.name && <p>Hello, {session?.user?.name}</p>}
      <div>about</div>
    </>
  );
}
