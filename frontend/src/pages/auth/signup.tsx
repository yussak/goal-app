import { useState } from "react";
import axios from "axios";
import SignupForm from "@/components/form/SignupForm";

// TODO:登録時にログインする→ https://github.com/YusukeSakuraba/goal-app/issues/28 で対応
// TODO: バリデーション追加→空欄（requiredでできてそうだが揃えたい）、文字数・形式

// TODO:next-auth hookがあると思うので書き換える
export default function signup() {
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
