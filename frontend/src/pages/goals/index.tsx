import GoalList from "@/components/GoalList";
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

  const deleteGoal = async (id: string) => {
    // 意図的にエラー出してダイアログ消えないことを確認するコード
    // throw new Error("Error in deleting goal");
    try {
      await axios.delete(`/goal/${id}`);
      mutate(`/${userId}/goals`);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <GoalsProvider>
      <h2>{t("goal_index.title")}</h2>
      <GoalList onDelete={deleteGoal} />
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
