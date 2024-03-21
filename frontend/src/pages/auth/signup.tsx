import { axios } from "@/utils/axios";
import SignupForm from "@/components/form/SignupForm";
import { signIn } from "next-auth/react";
import { signupFormData } from "@/types";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";

const Signup = () => {
  const { t } = useTranslation();

  const signup = async (data: signupFormData) => {
    const user = {
      name: data.name,
      email: data.email,
      password: data.password,
    };

    try {
      await axios.post("/auth/signup", user);
      signIn("credentials", {
        redirect: false,
        email: data.email,
        password: data.password,
      });
    } catch (error) {
      console.error("error: ", error);
    }
  };

  return (
    <div>
      asdf
      {/* todo:googleログインするならsignup login区別必要なさそうなので確認→email認証あるならわからん */}
      {/* <SignupForm signup={signup} /> */}
    </div>
  );
};

export default Signup;

export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
}
