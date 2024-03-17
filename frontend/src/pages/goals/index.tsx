import { CustomNextPage } from "@/types/custom-next-page";
import GoalList from "@/components/goals/GoalList";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useEffect, useState } from "react";
import { axios } from "@/utils/axios";
import { Goal } from "@/types";
import { useSession } from "next-auth/react";
import { Box, Tab, Tabs } from "@mui/material";

const TAB_PHASE_LIST = ["all", "plan", "wip", "done"];

const Goals: CustomNextPage = () => {
  const { t } = useTranslation();
  const { data: session } = useSession();
  const userId = session?.user ? session.user.id : null;

  const [activeTabIndex, setActiveTabIndex] = useState<number>(0);
  const [goals, setGoals] = useState<Goal[] | null>(null);

  useEffect(() => {
    fetchGoals(activeTabIndex);
  }, [activeTabIndex]);

  // phaseの指定があればそれに絞ったデータを取得する
  const fetchGoals = async (index: number) => {
    const phase = TAB_PHASE_LIST[index];
    const res = await axios.get(`/${userId}/goals?phase=${phase}`);
    setGoals(res.data);
  };

  const handleTabChange = (event: React.SyntheticEvent, newTab: number) => {
    setActiveTabIndex(newTab);
  };

  function a11yProps(index: number) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }

  return (
    <div>
      <h2>{t("goal_index.title")}</h2>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={activeTabIndex}
          onChange={handleTabChange}
          aria-label="basic tabs example"
        >
          <Tab label={t("tab_name.all")} {...a11yProps(0)} />
          <Tab label={t("tab_name.plan")} {...a11yProps(1)} />
          <Tab label={t("tab_name.wip")} {...a11yProps(2)} />
          <Tab label={t("tab_name.done")} {...a11yProps(3)} />
        </Tabs>
        <GoalList goals={goals} />
      </Box>
    </div>
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
