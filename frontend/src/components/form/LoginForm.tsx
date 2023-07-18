import { Button, Container, Stack, TextField } from "@mui/material";

type loginFormProps = {
  setEmail: (email: string) => void;
  setPassword: (password: string) => void;
  loginUser: (e: React.FormEvent) => void;
  email: string;
  password: string;
};

const loginForm = ({
  setEmail,
  setPassword,
  loginUser,
  email,
  password,
}: loginFormProps) => {
  return (
    <Container sx={{ pt: 3 }}>
      <Stack spacing={2}>
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
        <Button variant="contained" type="submit" onClick={loginUser}>
          ログイン
        </Button>
      </Stack>
    </Container>
  );
};

export default loginForm;
