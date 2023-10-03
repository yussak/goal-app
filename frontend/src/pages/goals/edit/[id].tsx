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
    smartSpecific: "",
    smartMeasurable: "",
    smartAchievable: "",
    smartRelevant: "",
    smartTimeBound: "",
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
      console.log("asdf", data);
      SetGoalData({
        ...goalData,
        purpose: data.purpose,
        loss: data.loss,
        smartSpecific: data.smart_specific,
        smartMeasurable: data.smart_measurable,
        smartAchievable: data.smart_achievable,
        smartRelevant: data.smart_relevant,
        smartTimeBound: data.smart_time_bound,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const editGoal = async () => {
    const formData = new FormData();
    formData.append("purpose", goalData.purpose);
    formData.append("loss", goalData.loss);
    formData.append("smartSpecific", goalData.smartSpecific);
    formData.append("smartMeasurable", goalData.smartMeasurable);
    formData.append("smartAchievable", goalData.smartAchievable);
    formData.append("smartRelevant", goalData.smartRelevant);
    formData.append("smartTimeBound", goalData.smartTimeBound);
    if (session?.user?.id) {
      formData.append("user_id", session?.user.id);
    }

    try {
      await axios.put(`/goals/edit/${id}`, formData, {
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
