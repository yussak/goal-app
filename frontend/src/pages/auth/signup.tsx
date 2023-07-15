import { useState } from "react";
import axios from "axios";

// TODO:登録時にログインする
export default function signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const register = async (e: React.FormEvent) => {
    e.preventDefault();

    const user = {
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

  // TODO: バリデーション追加
  // TODO: パスワード再発行可能にしたい
  // TODO: フォームコンポーネント化
  return (
    <form onSubmit={register}>
      <input
        type="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
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
      <button type="submit">新規登録</button>
    </form>
  );
}
