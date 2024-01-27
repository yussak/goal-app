import GoalForm from "@/components/form/GoalForm";
import { GoalFormData } from "@/types";
import { axios } from "@/utils/axios";
import { authGuard } from "@/utils/authGuard";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { mutate } from "swr";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export default function CreateGoal() {
  authGuard();
  const router = useRouter();
  const { data: session } = useSession();
  const { t } = useTranslation();
  const userId = session?.user && session.user.id;

  const addGoal = async (data: GoalFormData) => {
    const params = {
      ...data,
      userId: userId,
    };
    try {
      const res = await axios.post("/goal", params);

      const newGoalId = res.data.id;
      router.push(`/goals/${newGoalId}`);
      mutate(`/${userId}/goals`);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <h2>{t("goal_create.title")}</h2>
      <GoalForm addGoal={addGoal} />
    </>
  );
}

// 値は入力によって変動せずあらかじめ用意されているテキストなのでSSG
export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
}
