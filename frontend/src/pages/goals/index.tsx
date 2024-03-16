import { CustomNextPage } from "@/types/custom-next-page";
import GoalList from "@/components/goals/GoalList";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useEffect, useState } from "react";
import { axios } from "@/utils/axios";
import { Goal } from "@/types";
import { useSession } from "next-auth/react";

const Goals: CustomNextPage = () => {
  const { t } = useTranslation();
  const { data: session } = useSession();
  const userId = session?.user ? session.user.id : null;

  const [activeTab, setActiveTab] = useState("ALL");
  const [goals, setGoals] = useState<Goal[] | null>(null);

  useEffect(() => {
    fetchGoals(activeTab);
  }, [activeTab]);

  const fetchGoals = async (phase: string) => {
    const res = await axios.get(`/${userId}/goals?phase=${phase}`);
    setGoals(res.data);
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  const TAB_NAME_LIST = {
    ALL: "ALL",
    PLAN: "予定",
    WIP: "WIP",
    DONE: "完了",
  };

  return (
    <>
      <h2>{t("goal_index.title")}</h2>
      <div>
        <div>
          <button onClick={() => handleTabChange(TAB_NAME_LIST.ALL)}>
            {TAB_NAME_LIST.ALL}
          </button>
          <button onClick={() => handleTabChange(TAB_NAME_LIST.PLAN)}>
            {TAB_NAME_LIST.PLAN}
          </button>
          <button onClick={() => handleTabChange(TAB_NAME_LIST.WIP)}>
            {TAB_NAME_LIST.WIP}
          </button>
          <button onClick={() => handleTabChange(TAB_NAME_LIST.DONE)}>
            {TAB_NAME_LIST.DONE}
          </button>
        </div>
        <div>
          <GoalList goals={goals} />
        </div>
      </div>
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
