import { Button } from "@mui/material";
import { signIn } from "next-auth/react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export default function signinpage() {
  return (
    <div>
      <Button onClick={() => signIn("google")}>
        Googleアカウントでログイン
      </Button>
    </div>
  );
}

export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
}
