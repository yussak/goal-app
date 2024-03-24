import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { useEffect, useState } from "react";
import { axios } from "@/utils/axios";
import { useSession } from "next-auth/react";

export default function Home() {
  const { t } = useTranslation();
  const { data: session } = useSession();
  const userId = session?.user.id;
  const [goalCount, setGoalCount] = useState<number>(0);
  const [milestoneCount, setMilestoneCount] = useState<number>(0);

  useEffect(() => {
    getGoalCount();
    getMileCount();
  });

  // 目標の個数を取得
  const getGoalCount = async () => {
    const { data } = await axios.get(`/users/${userId}/goals/count`);
    setGoalCount(data.count);
  };

  // 中目標の個数を取得
  const getMileCount = async () => {
    const { data } = await axios.get(`/users/${userId}/milestones/count`);
    setMilestoneCount(data.count);
  };

  return (
    <>
      <h1>{t("index.title")}</h1>
      <p>目標の数：{goalCount}</p>
      <p>中目標：{milestoneCount}</p>
      <p>todo:40</p>
      <p>WIPの目標：4</p>
      <p>完了した目標：８</p>
    </>
  );
}

export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
}
