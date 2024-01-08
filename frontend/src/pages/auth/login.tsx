import { useState } from "react";
import LoginForm from "@/components/form/LoginForm";
import { signIn } from "next-auth/react";

// TODO: バリデーション追加→空欄（requiredでできてそうだが揃えたい）、文字数・形式
export default function Login() {
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");

  // const loginUser = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   signIn("credentials", {
  //     redirect: false,
  //     email: email,
  //     password: password,
  //   });
  // };

  return (
    <>
      <button onClick={() => signIn()}>Sign in</button>

      {/* <LoginForm
        setEmail={setEmail}
        setPassword={setPassword}
        loginUser={loginUser}
        email={email}
        password={password}
      /> */}
    </>
  );
}
