import { useState } from "react";
import axios from "axios";
import { Button, Container, Stack, TextField } from "@mui/material";

// TODO:登録時にログインする→ https://github.com/YusukeSakuraba/goal-app/issues/28 で対応
// TODO: バリデーション追加→空欄（requiredでできてそうだが揃えたい）、文字数・形式
// TODO: フォームコンポーネント化
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

  return (
    <Container sx={{ pt: 3 }}>
      <form onSubmit={register}>
        <Stack spacing={2}>
          <TextField
            label="name"
            type="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
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
            新規登録
          </Button>
        </Stack>
      </form>
    </Container>
  );
}
