import { Button } from "@mui/material";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { useTranslation } from "next-i18next";

export default function Sidebar() {
  const { data: session } = useSession();
  const { t } = useTranslation("common");

  return (
    <ul>
      {/* ログイン時のみ表示 */}
      {session?.user ? (
        <>
          <li>
            <Link href="/goals/create">{t("sidebar.link1")}</Link>
          </li>
          <li>
            <Link href="/goals">{t("sidebar.link2")}</Link>
          </li>
        </>
      ) : (
        <>
          {/* 美ログイン時のみ表示 */}
          <li>
            <Link href="/auth/signup">{t("sidebar.link3")}</Link>
          </li>
          <li>
            <Link href="/auth/login">{t("sidebar.link4")}</Link>
          </li>
        </>
      )}
      {/* 常に表示 */}
      <li>
        <Link href="/about">{t("sidebar.link5")}</Link>
      </li>
      {/* ログイン時のみ表示 */}
      {session?.user && (
        <>
          <li>
            {/* ログイン時のみ表示 */}
            {/* ログアウト時にログイン画面にリダイレクト */}
            <Button
              variant="outlined"
              onClick={() => signOut({ callbackUrl: "/auth/login" })}
            >
              {t("sidebar.link6")}
            </Button>
          </li>
        </>
      )}
      <li>
        <LanguageSwitcher />
      </li>
    </ul>
  );
}
