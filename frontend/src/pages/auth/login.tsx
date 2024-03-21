import { t } from "i18next";
import { signIn } from "next-auth/react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";

const Login = () => {
  const { t } = useTranslation();

  return (
    <div>
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
