import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "@/components/Layout";
import { appWithTranslation } from "next-i18next";
import { SessionProvider } from "next-auth/react";
import AuthGuard from "@/components/AuthGuard";
import { Session } from "next-auth";
import { NextComponentType } from "next";
import { MilestoneProvider } from "@/contexts/mileContext";
import { GoalsProvider } from "@/contexts/goalContext";

export type CustomAppProps = AppProps<{ session: Session }> & {
  Component: NextComponentType & { requireAuth?: boolean };
};

const MyApp = ({
  Component,
  pageProps: { session, ...pageProps },
}: CustomAppProps) => {
  return (
    <SessionProvider session={session}>
      {/* todo:一部でしか使わないデータも_app.tsxでproviderで囲んでいいのか確認 */}
      <GoalsProvider>
        <MilestoneProvider>
          <Layout>
            {Component.requireAuth ? (
              <AuthGuard>
                <Component {...pageProps} />
              </AuthGuard>
            ) : (
              <Component {...pageProps} />
            )}
          </Layout>
        </MilestoneProvider>
      </GoalsProvider>
    </SessionProvider>
  );
};

export default appWithTranslation(MyApp);
