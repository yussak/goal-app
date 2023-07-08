import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "@/components/Layout";
import { appWithTranslation } from "next-i18next";
import { UserContext } from "@/contexts/userContext";
import { useState } from "react";
import { User } from "@/types";

const MyApp = ({ Component, pageProps }: AppProps) => {
  const [user, setUser] = useState<User | null>(null);

  const login = (userData: User) => {
    setUser(userData);
  };

  return (
    <UserContext.Provider value={{ user, login }}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </UserContext.Provider>
  );
};

export default appWithTranslation(MyApp);
