import { useState } from "react";
import LoginForm from "@/components/form/LoginForm";
import { signIn } from "next-auth/react";

// TODO:パスワード再登録可能にする→ https://github.com/YusukeSakuraba/goal-app/issues/27 で対応
// TODO: バリデーション追加→空欄（requiredでできてそうだが揃えたい）、文字数・形式
// TODO:ログイン成功時にフラッシュ出す
// TODO:ログイン失敗時にフラッシュ出す
export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginUser = async (e: React.FormEvent) => {
    e.preventDefault();
    signIn("credentials", {
      redirect: false,
      email: email,
      password: password,
    });
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
