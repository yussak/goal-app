import { loginFormData } from "@/types";
import { Button, Container, Stack, TextField } from "@mui/material";
import Link from "next/link";
import { SubmitHandler, useForm } from "react-hook-form";

type loginFormProps = {
  loginUser: (data: loginFormData) => void;
};

const loginForm = ({ loginUser }: loginFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<loginFormData>({ mode: "onChange" });

  const onSubmit: SubmitHandler<loginFormData> = (data) => {
    loginUser(data);
  };

  // TODO: バリデーション追加
  return (
    <>
      <Container sx={{ pt: 3 }}>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <Stack spacing={2}>
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
              ログイン
            </Button>
          </Stack>
        </form>
        <Link href="/auth/signup">新規登録はこちら</Link>
      </Container>
    </>
  );
};

export default loginForm;
