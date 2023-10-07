import EditGoalForm from "@/components/form/EditGoalForm";
import { GoalFormData } from "@/types";
import { axios } from "@/utils/axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function EditGoal() {
  const router = useRouter();
  const id = router.query.id;

  const [goalData, SetGoalData] = useState<GoalFormData>({
    purpose: "",
    loss: "",
    smartS: "",
    smartM: "",
    smartA: "",
    smartR: "",
    smartT: "",
  });

  const handleSetGoalData = <K extends keyof GoalFormData>(
    key: K,
    value: GoalFormData[K]
  ) => {
    SetGoalData((prev) => ({ ...prev, [key]: value }));
  };

  const { data: session } = useSession();

  useEffect(() => {
    if (router.isReady) {
      getGoal();
    }
  }, [router.isReady]);

  const getGoal = async () => {
    try {
      const { data } = await axios.get(`/goals/${id}`);
      SetGoalData({
        ...goalData,
        purpose: data.purpose,
        loss: data.loss,
        smartS: data.smartS,
        smartM: data.smartM,
        smartA: data.smartA,
        smartR: data.smartR,
        smartT: data.smartT,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const editGoal = async (data: GoalFormData) => {
    const params = {
      ...data,
      user_id: session?.user?.id,
    };

    try {
      // TODO:画像投稿消したのでheadersはいらないと思うので確認
      await axios.put(`/goals/edit/${id}`, params, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      router.push(`/goals/${id}`);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <h2>目標編集</h2>

      <EditGoalForm
        editGoal={editGoal}
        SetGoalData={handleSetGoalData}
        goalData={goalData}
      />
    </>
  );
}
