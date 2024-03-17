import MilestoneForm from "@/components/form/MilestoneForm";
import MilestoneList from "@/components/milestones/MilestoneList";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { Button } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { CustomNextPage } from "@/types/custom-next-page";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { useMilestone } from "@/contexts/mileContext";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { axios } from "@/utils/axios";
import { Goal } from "@/types";

const GoalDetail: CustomNextPage = () => {
  const { data: session } = useSession();
  const { t } = useTranslation();
  const router = useRouter();
  const id = router.query.id;
  const [goal, setGoal] = useState<Goal | null>(null);
  const { milestones } = useMilestone();

  useEffect(() => {
    if (id) {
      getGoalDetails(id as string);
    }
  }, [id]);

  const getGoalDetails = async (goalId: string) => {
    try {
      const { data } = await axios.get(`/goals/${goalId}`);
      setGoal(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {goal ? (
        <>
          <h2>{t("goal_detail.title1")}</h2>
          {/* todo:このページでも削除可能にしたい */}
          <Button href={`/goals/edit/${goal.id}`} startIcon={<EditIcon />}>
            {t("goal_detail.button1")}
          </Button>
          <p>content: {goal.content}</p>
          <p>purpose: {goal.purpose}</p>
          <p>benefit: {goal.benefit}</p>
          <p>progress: {goal.progress}</p>
          <p>phase: {goal.phase}</p>
          {/* <p>userId(デバッグ用): {goal.userId}</p> */}
          {/* <p>CreatedAt(デバッグ用): {goal.CreatedAt.toString()}</p> */}
          {/* <p>UpdatedAt(デバッグ用): {goal.UpdatedAt.toString()}</p> */}
          <Link href="/goals">{t("goal_detail.link1")}</Link>
          {session?.user && (
            <>
              {milestones.length < 5 ? (
                <MilestoneForm />
              ) : (
                <p>{t("goal_detail.text1")}</p>
              )}
            </>
          )}
          <h3>{t("goal_detail.title3")}</h3>
          <MilestoneList />
        </>
      ) : (
        <p>{t("goal_detail.not_found")}</p>
      )}
    </>
  );
};

export default GoalDetail;
GoalDetail.requireAuth = true;

export async function getServerSideProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
}
