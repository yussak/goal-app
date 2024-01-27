import EditGoalForm from "@/components/form/EditGoalForm";
import { GoalFormData } from "@/types";
import { axios } from "@/utils/axios";
import { authGuard } from "@/utils/authGuard";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function EditGoal() {
  authGuard();
  const router = useRouter();
  const id = router.query.id;

  const [goalData, SetGoalData] = useState<GoalFormData>({
    content: "",
    purpose: "",
    loss: "",
  });

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
        content: data.content,
        purpose: data.purpose,
        loss: data.loss,
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
      await axios.put(`/goals/edit/${id}`, params);
      router.push(`/goals/${id}`);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <h2>目標編集</h2>
      <EditGoalForm editGoal={editGoal} goalData={goalData} />
    </>
  );
}
