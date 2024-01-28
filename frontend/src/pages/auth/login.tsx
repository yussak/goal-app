import LoginForm from "@/components/form/LoginForm";
import { loginFormData } from "@/types";
import { signIn } from "next-auth/react";

const Login = () => {
  const loginUser = async (data: loginFormData) => {
    signIn("credentials", {
      redirect: false,
      email: data.email,
      password: data.password,
    });
  };

  return <LoginForm loginUser={loginUser} />;
};

export default Login;
