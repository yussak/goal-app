import {
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { useTranslation } from "next-i18next";
import InboxIcon from "@mui/icons-material/MoveToInbox";

export default function Sidebar() {
  const { data: session } = useSession();
  const { t } = useTranslation();

  // todo:mapで書き換える
  return (
    <List>
      {/* ログイン時のみ表示 */}
      {session?.user ? (
        <>
          <ListItem disablePadding>
            <Link href="/goals/create">
              <ListItemButton>
                <ListItemIcon>
                  {/* 仮 */}
                  <InboxIcon />
                </ListItemIcon>
                <ListItemText primary={t("sidebar.link1")} />
              </ListItemButton>
            </Link>
          </ListItem>
          <ListItem disablePadding>
            <Link href="/goals/create">
              <ListItemButton>
                <ListItemIcon>
                  {/* 仮 */}
                  <InboxIcon />
                </ListItemIcon>
                <ListItemText primary={t("sidebar.link2")} />
              </ListItemButton>
            </Link>
          </ListItem>
        </>
      ) : (
        <>
          {/* 美ログイン時のみ表示 */}
          <ListItem disablePadding>
            <Link href="/auth/signup">
              <ListItemButton>
                <ListItemIcon>
                  <InboxIcon />
                </ListItemIcon>
                <ListItemText primary={t("sidebar.link3")} />
              </ListItemButton>
            </Link>
          </ListItem>
          <ListItem disablePadding>
            <Link href="/auth/login">
              <ListItemButton>
                <ListItemIcon>
                  <InboxIcon />
                </ListItemIcon>
                <ListItemText primary={t("sidebar.link4")} />
              </ListItemButton>
            </Link>
          </ListItem>
        </>
      )}
      {/* 常に表示 */}
      <ListItem disablePadding>
        <Link href="/about">
          <ListItemButton>
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText primary={t("sidebar.link5")} />
          </ListItemButton>
        </Link>
      </ListItem>
      {/* ログイン時のみ表示 */}
      {session?.user && (
        <>
          <ListItem disablePadding>
            {/* ログアウト時にログイン画面にリダイレクト */}
            <ListItemButton
              onClick={() => signOut({ callbackUrl: "/auth/login" })}
            >
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary={t("sidebar.link6")} />
            </ListItemButton>
          </ListItem>
        </>
      )}
      <Divider />
      <ListItem disablePadding>
        <ListItemButton>
          <LanguageSwitcher />
        </ListItemButton>
      </ListItem>
    </List>
  );
}
