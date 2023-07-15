import { useEffect, useState } from "react";
import axios from "axios";
import { useUser } from "@/contexts/userContext";
import cookie from "cookie";
import { NextPageContext } from "next";

export default function Login({ user: initialUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { user, login } = useUser();

  useEffect(() => {
    if (initialUser) {
      login(initialUser);
    }
  }, [initialUser]);
  // console.log("user is", user);

  const handleSumit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:8080/auth/login",
        {
          email,
          password,
        },
        { withCredentials: true }
      );
      // TODO: 必要なのは確定なのでその理由をコメント
      if (res.data.token) {
        document.cookie = `token=${res.data.token}; path=/`;
        // console.log("user name is", res.data.user.name);
        login(res.data.user);
      }
    } catch (error) {
      console.error("error:", error);
    }
  };

  // TODO: バリデーション追加
  // TODO: パスワード再発行可能にしたい
  // TODO: フォームコンポーネント化
  return (
    <>
      <form onSubmit={handleSumit}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">ログイン</button>
      </form>
      test
      {user ? <p>{user.name} desu</p> : "ログインしてない"}
    </>
  );
}

export async function getServerSideProps(context: NextPageContext) {
  // export async function getServerSideProps(context) {
  const cookies = cookie.parse(
    context.req ? context.req.headers.cookie || "" : document.cookie
  );
  const token = cookies.token;

  // console.log("token is", token);

  // Tokenが存在しない場合はユーザー情報を空にする
  if (!token) {
    return { props: { user: null } };
  }

  try {
    const res = await axios.post(
      "http://backend:8080/auth/decodeToken",
      {},
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return { props: { user: res.data.user || null } };
  } catch (error) {
    console.error("error: ", error);
    return { props: {} };
  }
}
