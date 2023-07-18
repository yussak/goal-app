import { useState } from "react";
import axios from "axios";
import { checkAuth } from "@/utils/auth";
import { NextPageContext } from "next";
import { useLogin } from "@/hooks/useLogin";
import { User } from "@/types";
import SignupForm from "@/components/form/SignupForm";

// TODO:登録時にログインする→ https://github.com/YusukeSakuraba/goal-app/issues/28 で対応
// TODO: バリデーション追加→空欄（requiredでできてそうだが揃えたい）、文字数・形式
export default function signup({ user: currentUser }: { user: User | null }) {
  useLogin(currentUser);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const register = async (e: React.FormEvent) => {
    e.preventDefault();

    const user = {
      name: name,
      email: email,
      password: password,
    };

    try {
      await axios.post(process.env.NEXT_PUBLIC_API_URL + "/auth/signup", user);
      // console.log(res.data);
    } catch (error) {
      console.error("error: ", error);
    }
  };

  return (
    <SignupForm
      setName={setName}
      setEmail={setEmail}
      setPassword={setPassword}
      register={register}
      name={name}
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
