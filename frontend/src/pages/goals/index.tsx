import GoalList from "@/components/goals/GoalList";
import { useTranslation } from "next-i18next";
import { mutate } from "swr";
import { axios } from "@/utils/axios";
import { useSession } from "next-auth/react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { CustomNextPage } from "@/types/custom-next-page";
import { GoalsProvider } from "@/utils/context";

const Goals: CustomNextPage = () => {
  const { t } = useTranslation();

  const { data: session } = useSession();
  const userId = session?.user ? session.user.id : null;

  return (
    <GoalsProvider>
      <h2>{t("goal_index.title")}</h2>
      <GoalList />
      {/* <GoalList onDelete={deleteGoal} /> */}
    </GoalsProvider>
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
