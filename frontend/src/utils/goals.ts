import { GoalFormData } from "@/types";
import { axios } from "./axios";
import { mutate } from "swr";

export const useAddGoal = async (
  // todo:userIdもGoalFormDataに含めるべきでは
  data: GoalFormData,
  userId: string,
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

// todo:リロードしないと消えないので修正する
export const deleteGoal = async (goalId: string, userId: string) => {
  // 意図的にエラー出してダイアログ消えないことを確認するコード
  // throw new Error("Error in deleting goal");
  try {
    await axios.delete(`/goal/${goalId}`);
    mutate(`/${userId}/goals`);
  } catch (error) {
    console.error(error);
  }
};
