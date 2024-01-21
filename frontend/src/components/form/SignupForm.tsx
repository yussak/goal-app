import { signupFormData } from "@/types";
import { Button, Container, Stack, TextField } from "@mui/material";
import Link from "next/link";
import { useForm } from "react-hook-form";

type SignupFormProps = {
  signup: (data: signupFormData) => void;
};

const SignupForm = ({ signup }: SignupFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<signupFormData>({ mode: "onChange" });

  // todo:バリデーション追加
  return (
    <Container sx={{ pt: 3 }}>
      <form onSubmit={handleSubmit(signup)} noValidate>
        <Stack spacing={2}>
          <TextField
            label="name"
            type="name"
            {...register("name", { required: true })}
            error={!!errors.name}
            helperText={errors.name?.message}
          />
          <TextField
            label="email"
            type="email"
            {...register("email", { required: true })}
            error={!!errors.email}
            helperText={errors.email?.message}
          />
          <TextField
            label="password"
            type="password"
            {...register("password", { required: true })}
            error={!!errors.password}
            helperText={errors.password?.message}
          />
          <Button variant="contained" type="submit" disabled={!isValid}>
            新規登録
          </Button>
        </Stack>
        <Link href="/auth/login">ログインはこちら</Link>
      </form>
    </Container>
  );
};

export default SignupForm;
