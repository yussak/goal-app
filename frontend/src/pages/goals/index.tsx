import { CustomNextPage } from "@/types/custom-next-page";
import GoalList from "@/components/goals/GoalList";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const Goals: CustomNextPage = () => {
  const { t } = useTranslation();

  return (
    <>
      <h2>{t("goal_index.title")}</h2>
      <GoalList />
    </>
  );
};

export default Goals;
// ログイン時のみこのページを表示可能にする
Goals.requireAuth = true;

export async function getServerSideProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
}
