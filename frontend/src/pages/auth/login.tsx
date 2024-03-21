import LoginForm from "@/components/form/LoginForm";
import { loginFormData } from "@/types";
import { t } from "i18next";
import { signIn } from "next-auth/react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";

const Login = () => {
  const { t } = useTranslation();
  const loginUser = async (data: loginFormData) => {
    signIn("credentials", {
      redirect: false,
      email: data.email,
      password: data.password,
    });
  };

  return (
    <div>
      <LoginForm loginUser={loginUser} />
      <button onClick={() => signIn()}>ログイン</button>
    </div>
  );
};

export default Login;

export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
}
