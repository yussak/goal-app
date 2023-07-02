import { useTranslation } from "next-i18next";

export const LanguageSwitcher: React.FC = () => {
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <>
      <button onClick={() => changeLanguage("en")}>{t("english")}</button>
      <button onClick={() => changeLanguage("ja")}>{t("japanese")}</button>
    </>
  );
};
