import { CustomNextPage } from "@/types/custom-next-page";
import GoalList from "@/components/goals/GoalList";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useEffect, useState } from "react";
import { axios } from "@/utils/axios";
import { Goal } from "@/types";

const Goals: CustomNextPage = () => {
  const { t } = useTranslation();

  const [activeTab, setActiveTab] = useState("予定");
  const [goals, setGoals] = useState<Goal[] | null>(null);

  useEffect(() => {
    fetchGoals(activeTab);
  }, [activeTab]);

  const fetchGoals = async (phase: string) => {
    const res = await axios.get(`/goals?phase=${phase}`);
    setGoals(res.data);
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <>
      <h2>{t("goal_index.title")}</h2>
      <div>
        <div>
          <button onClick={() => handleTabChange("予定")}>予定</button>
          <button onClick={() => handleTabChange("WIP")}>WIP</button>
          <button onClick={() => handleTabChange("完了")}>完了</button>
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
