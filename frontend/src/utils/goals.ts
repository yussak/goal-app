import { GoalFormData } from "@/types";
import { axios } from "./axios";

export const useAddGoal = async (
  // todo:userIdもGoalFormData煮含めるべきでは
  data: GoalFormData,
  userId: string | null,
  router: any
  //   router: ReturnType<typeof import("next/router").useRouter>
) => {
  const params = {
    ...data,
    userId: userId,
  };
  try {
    const res = await axios.post("/goal", params);

    const newGoalId = res.data.id;
    // todo: 責務的に移動は呼び出す側でやりたい
    router.push(`/goals/${newGoalId}`);
    // return res.data.id;
  } catch (error) {
    console.error(error);
  }
};
