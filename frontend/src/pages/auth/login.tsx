import GuestLoginButton from "@/components/GuestLoginButton";
import LoginForm from "@/components/form/LoginForm";
import { loginFormData } from "@/types";
import { authGuard } from "@/utils/authGuard";
import { signIn } from "next-auth/react";

export default function Login() {
  // ログイン済のときにログインページにアクセスしたらトップページにリダイレクトする
  authGuard();

  const loginUser = async (data: loginFormData) => {
    signIn("credentials", {
      redirect: false,
      email: data.email,
      password: data.password,
    });
  };

  return (
    <>
      <LoginForm loginUser={loginUser} />
      <GuestLoginButton />
    </>
  );
}
