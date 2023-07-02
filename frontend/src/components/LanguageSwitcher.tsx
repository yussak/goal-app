import { useTranslation } from "next-i18next";
import { ChangeEvent } from "react";

type Language = "ja" | "en";

export const LanguageSwitcher: React.FC = () => {
  const { t, i18n } = useTranslation();

  const changeLanguage = (event: ChangeEvent<HTMLSelectElement>) => {
    i18n.changeLanguage(event.target.value as Language);
  };

  return (
    <select defaultValue={i18n.language} onChange={changeLanguage}>
      <option value="ja">{t("日本語")}</option>
      <option value="en">{t("english")}</option>
    </select>
  );
};
