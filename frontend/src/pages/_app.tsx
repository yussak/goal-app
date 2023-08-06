import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "@/components/Layout";
import { appWithTranslation } from "next-i18next";
import { SessionProvider } from "next-auth/react";
const MyApp = ({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) => {
  console.log("apptsxw", session);

  return (
    <SessionProvider session={session}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SessionProvider>
  );
};

export default appWithTranslation(MyApp);
