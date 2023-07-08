import { useState } from "react";
import axios from "axios";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSumit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await axios.post("http://localhost:8080/auth/login", {
      email,
      password,
    });

    console.log(res.data);
  };

  // TODO: バリデーション追加;
  // TODO: パスワード再発行可能にしたい
  return (
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
  );
}
