import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "@/components/Layout";
import { appWithTranslation } from "next-i18next";
import { UserProvider } from "@/contexts/userContext";

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <UserProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </UserProvider>
  );
};

export default appWithTranslation(MyApp);
