import {
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Select,
} from "@mui/material";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { useTranslation } from "next-i18next";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import HomeIcon from "@mui/icons-material/Home";
import AddIcon from "@mui/icons-material/Add";
import ListIcon from "@mui/icons-material/List";
import InfoIcon from "@mui/icons-material/Info";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import TranslateIcon from "@mui/icons-material/Translate";

export default function Sidebar() {
  const { data: session } = useSession();
  const { t } = useTranslation();

  // todo:mapで書き換える
  return (
    <List>
      <ListItem disablePadding>
        <Link href="/">
          <ListItemButton>
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary={t("sidebar.home")} />
          </ListItemButton>
        </Link>
      </ListItem>
      {/* ログイン時のみ表示 */}
      {session?.user ? (
        <>
          <ListItem disablePadding>
            <Link href="/goals/create">
              <ListItemButton>
                <ListItemIcon>
                  <AddIcon />
                </ListItemIcon>
                <ListItemText primary={t("sidebar.add_goal")} />
              </ListItemButton>
            </Link>
          </ListItem>
          <ListItem disablePadding>
            <Link href="/goals/">
              <ListItemButton>
                <ListItemIcon>
                  <ListIcon />
                </ListItemIcon>
                <ListItemText primary={t("sidebar.goal_index")} />
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
                  <AddIcon />
                </ListItemIcon>
                <ListItemText primary={t("sidebar.signup")} />
              </ListItemButton>
            </Link>
          </ListItem>
          <ListItem disablePadding>
            <Link href="/auth/login">
              <ListItemButton>
                <ListItemIcon>
                  <LoginIcon />
                </ListItemIcon>
                <ListItemText primary={t("sidebar.login")} />
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
              <InfoIcon />
            </ListItemIcon>
            <ListItemText primary={t("sidebar.about")} />
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
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText primary={t("sidebar.logout")} />
            </ListItemButton>
          </ListItem>
        </>
      )}
      <Divider />
      <ListItem disablePadding>
        <ListItemButton>
          <ListItemIcon>
            <TranslateIcon />
          </ListItemIcon>
          <LanguageSwitcher />
        </ListItemButton>
      </ListItem>
    </List>
  );
}
