import { MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";

type Language = "ja" | "en";

export const LanguageSwitcher: React.FC = () => {
  const { t, i18n } = useTranslation();
  const router = useRouter();

  const changeLanguage = async (event: SelectChangeEvent<string>) => {
    const newLocale = event.target.value as Language;
    await i18n.changeLanguage(newLocale);
    await router.push(router.asPath, router.asPath, { locale: newLocale });
  };

  return (
    <>
      <Select defaultValue={i18n.language} onChange={changeLanguage}>
        <MenuItem value="ja">{t("japanese")}</MenuItem>
        <MenuItem value="en">{t("english")}</MenuItem>
      </Select>
    </>
  );
};
