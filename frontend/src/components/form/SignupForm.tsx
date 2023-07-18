import { Button, Container, Stack, TextField } from "@mui/material";

type SignupFormProps = {
  setName: (name: string) => void;
  setEmail: (email: string) => void;
  setPassword: (password: string) => void;
  register: (e: React.FormEvent) => void;
  name: string;
  email: string;
  password: string;
};

const SignupForm = ({
  setName,
  setEmail,
  setPassword,
  register,
  name,
  email,
  password,
}: SignupFormProps) => {
  return (
    <Container sx={{ pt: 3 }}>
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
        <Button variant="contained" type="submit" onClick={register}>
          新規登録
        </Button>
      </Stack>
    </Container>
  );
};

export default SignupForm;
