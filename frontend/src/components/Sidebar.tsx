import {
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { useTranslation } from "next-i18next";
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

  const items = [
    { text: "sidebar.home", icon: <HomeIcon />, link: "/", alwaysShow: true },
    {
      text: "sidebar.add_goal",
      icon: <AddIcon />,
      link: "/goals/create",
      alwaysShow: session?.user,
    },
    {
      text: "sidebar.goal_index",
      icon: <ListIcon />,
      link: "/goals/",
      alwaysShow: session?.user,
    },
    {
      text: "sidebar.daily_report_index",
      icon: <ListIcon />,
      link: "/daily_reports/",
      alwaysShow: session?.user,
    },
    {
      text: "sidebar.signup",
      icon: <AddIcon />,
      link: "/auth/signup",
      alwaysShow: !session?.user,
    },
    {
      text: "sidebar.login",
      onClick: () => signIn(),
      icon: <LoginIcon />,
      alwaysShow: !session?.user,
    },
    {
      text: "sidebar.about",
      icon: <InfoIcon />,
      link: "/about",
      alwaysShow: true,
    },
    {
      text: "sidebar.logout",
      icon: <LogoutIcon />,
      onClick: () => signOut({ callbackUrl: "/auth/login" }),
      alwaysShow: session?.user,
    },
  ];

  return (
    <List>
      {items.map(
        (item, index) =>
          item.alwaysShow && (
            <ListItem key={index} disablePadding>
              {item.link ? (
                <Link href={item.link}>
                  <ListItemButton>
                    <ListItemIcon>{item.icon}</ListItemIcon>
                    <ListItemText primary={t(item.text)} />
                  </ListItemButton>
                </Link>
              ) : (
                <ListItemButton onClick={item.onClick}>
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={t(item.text)} />
                </ListItemButton>
              )}
            </ListItem>
          )
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
