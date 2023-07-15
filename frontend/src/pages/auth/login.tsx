import { useEffect, useState } from "react";
import axios from "axios";
import { useUser } from "@/contexts/userContext";
import cookie from "cookie";
import { NextPageContext } from "next";
import { Button, Container, Stack, TextField } from "@mui/material";

// TODO:型を追加する（User | null)→他のところ見てどう追加するか確認する
// TODO:パス再登録可能にしたい→別issueでも可
// TODO:フォーム自動で入力しないようにしたい
// TODO:ログイン成功時にフラッシュ出す
// TODO:ログイン失敗時にフラッシュ出す
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

    const user = {
      email: email,
      password: password,
    };

    try {
      const res = await axios.post(
        process.env.NEXT_PUBLIC_API_URL + "/auth/login",
        user,
        { withCredentials: true }
      );
      // TODO: 必要なのは確定なのでその理由をコメント
      if (res.data.token) {
        // TODO:なにをやってるのかコメント追加
        document.cookie = `token=${res.data.token}; path=/`;
        // console.log("user name is", res.data.user.name);
        // TODO:なにをやってるのかコメント追加
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
    <Container sx={{ pt: 3 }}>
      <form onSubmit={handleSumit}>
        <Stack spacing={2}>
          <TextField
            label="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <TextField
            label="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Button variant="contained" type="submit">
            ログイン
          </Button>
        </Stack>
      </form>
    </Container>
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
