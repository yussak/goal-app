import { axios } from "@/utils/axios";
import SignupForm from "@/components/form/SignupForm";
import { signIn } from "next-auth/react";
import { signupFormData } from "@/types";
import { authGuard } from "@/utils/authGuard";

export default function signup() {
  authGuard();

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

  return <SignupForm signup={signup} />;
}
