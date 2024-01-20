import GoalList from "@/components/GoalList";
import { useTranslation } from "next-i18next";
import useSWR, { mutate } from "swr";
import { axios } from "@/utils/axios";
import { fetcher } from "@/utils/fetcher";
import { useSession } from "next-auth/react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { checkAuth } from "@/utils/checkAuth";

export default function Goals() {
  checkAuth();
  const { t } = useTranslation();

  const { data: session } = useSession();

  const user_id = session?.user ? session.user.id : null;

  const { data: goals, error } = useSWR(`/${user_id}/goals`, fetcher);
  if (error) {
    console.error(error);
  }

  const deleteGoal = async (id: string) => {
    // 意図的にエラー出してダイアログ消えないことを確認するコード
    // throw new Error("Error in deleting goal");
    try {
      await axios.delete(`/goal/${id}`);
      mutate(`/${user_id}/goals`);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <h2>{t("goal_index.title")}</h2>
      <GoalList goals={goals} onDelete={deleteGoal} />
    </>
  );
}

export async function getServerSideProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
}
