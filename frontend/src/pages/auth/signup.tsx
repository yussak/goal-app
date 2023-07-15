import { useState } from "react";
import axios from "axios";

// TODO:登録時にログインする
export default function signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const register = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await axios.post("http://localhost:8080/auth/signup", {
      name,
      email,
      password,
    });

    console.log(res.data);
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
