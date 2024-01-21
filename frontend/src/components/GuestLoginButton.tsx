import { axios } from "@/utils/axios";
import { Button } from "@mui/material";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";

const GuestLoginButton = () => {
  const router = useRouter();
  const handleGuestLogin = async () => {
    // BEで作ったゲストユーザーのemail, passwordでログイン
    // これセキュリティに気をつけないとヤバそう
    // これだと環境変数が見えてしまうんだと…対処
    const guestName = process.env.NEXT_PUBLIC_GUEST_NAME;
    const guestEmail = process.env.NEXT_PUBLIC_GUEST_EMAIL;
    const guestPassword = process.env.NEXT_PUBLIC_GUEST_PASSWORD;

    const res = await axios.post("/auth/isGuestExisted", {
      email: guestEmail,
    });
    // console.log("asdf", res);
    // ゲストが存在している場合、そのアカウントとしてログインする
    if (res.data.exists) {
      signIn("credentials", {
        redirect: false,
        email: guestEmail,
        password: guestPassword,
      });
    } else {
      const user = {
        name: guestName,
        email: guestEmail,
        password: guestPassword,
      };

      try {
        await axios.post("/auth/signup", user);
        signIn("credentials", {
          redirect: false,
          email: guestEmail,
          password: guestPassword,
        });
      } catch (error) {
        console.error("error: ", error);
      }
    }
  };

  return (
    <>
      <Button variant="contained" color="secondary" onClick={handleGuestLogin}>
        guest login
      </Button>
    </>
  );
};

export default GuestLoginButton;
