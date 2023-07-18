import { useState } from "react";
import axios from "axios";
import { useUser } from "@/contexts/userContext";
import { NextPageContext } from "next";
import { User } from "@/types";
import { checkAuth } from "@/utils/auth";
import { useLogin } from "@/hooks/useLogin";
import LoginForm from "@/components/form/LoginForm";

// TODO:パスワード再登録可能にする→ https://github.com/YusukeSakuraba/goal-app/issues/27 で対応
// TODO: バリデーション追加→空欄（requiredでできてそうだが揃えたい）、文字数・形式
// TODO:ログイン成功時にフラッシュ出す
// TODO:ログイン失敗時にフラッシュ出す
export default function Login({ user: currentUser }: { user: User | null }) {
  useLogin(currentUser);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useUser();

  const loginUser = async (e: React.FormEvent) => {
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

  return (
    <LoginForm
      setEmail={setEmail}
      setPassword={setPassword}
      loginUser={loginUser}
      email={email}
      password={password}
    />
  );
}

export async function getServerSideProps(context: NextPageContext) {
  const user = await checkAuth(context);

  return {
    props: {
      user,
    },
  };
}
