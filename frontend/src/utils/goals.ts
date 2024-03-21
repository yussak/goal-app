import { GoalFormData } from "@/types";
import { axios } from "./axios";

export const useAddGoal = async (
  // todo:userIdもGoalFormDataに含めるべきでは
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
    return res.data.id;
  } catch (error) {
    console.error(error);
  }
};
