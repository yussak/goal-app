import { useContext, useState } from "react";
import axios from "axios";
import { UserContext } from "@/contexts/userContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(UserContext);

  const handleSumit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await axios.post("http://localhost:8080/auth/login", {
      email,
      password,
    });
    // TODO: 必要なのは確定なのでその理由をコメント
    if (res.data.token) {
      localStorage.setItem("token", res.data.token);
      // Set the user state
      login(res.data.user);
    }
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
