import EditGoalForm from "@/components/form/EditGoalForm";
import { GoalFormData } from "@/types";
import { CustomNextPage } from "@/types/custom-next-page";
import { axios } from "@/utils/axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const EditGoal: CustomNextPage = () => {
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
      userId: session?.user?.id,
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
};

export default EditGoal;
EditGoal.requireAuth = true;
