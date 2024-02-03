import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "@/components/Layout";
import { appWithTranslation } from "next-i18next";
import { SessionProvider } from "next-auth/react";
import AuthGuard from "@/components/AuthGuard";
import { Session } from "next-auth";
import { NextComponentType } from "next";
import { GoalsProvider } from "@/utils/context";

export type CustomAppProps = AppProps<{ session: Session }> & {
  Component: NextComponentType & { requireAuth?: boolean };
};

const MyApp = ({
  Component,
  pageProps: { session, ...pageProps },
}: CustomAppProps) => {
  return (
    <SessionProvider session={session}>
      {/* todo:goal以外のデータもcontext管理する予定なのでAppProviderみたいに名前変えるかも */}
      <GoalsProvider>
        <Layout>
          {Component.requireAuth ? (
            <AuthGuard>
              <Component {...pageProps} />
            </AuthGuard>
          ) : (
            <Component {...pageProps} />
          )}
        </Layout>
      </GoalsProvider>
    </SessionProvider>
  );
};

export default appWithTranslation(MyApp);
