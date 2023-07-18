import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { ChangeEvent } from "react";

type Language = "ja" | "en";

export const LanguageSwitcher: React.FC = () => {
  const { t, i18n } = useTranslation();
  const router = useRouter();

  const changeLanguage = async (event: ChangeEvent<HTMLSelectElement>) => {
    const newLocale = event.target.value as Language;
    await i18n.changeLanguage(newLocale);
    await router.push(router.asPath, router.asPath, { locale: newLocale });
  };

  return (
    <select defaultValue={i18n.language} onChange={changeLanguage}>
      <option value="ja">{t("japanese")}</option>
      <option value="en">{t("english")}</option>
    </select>
  );
};
