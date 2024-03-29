import { GoalFormData } from "@/types";
import { axios } from "./axios";
import { mutate } from "swr";

export const addGoal = async (data: GoalFormData) => {
  const params = {
    ...data,
  };

  try {
    const res = await axios.post("/goals", params);
    return res.data.id;
  } catch (error) {
    console.error(error);
  }
};

// todo:リロードしないと消えないので修正する
// そもそもswr使わなくするかも
export const deleteGoal = async (goalId: string, userId: string) => {
  // 意図的にエラー出してダイアログ消えないことを確認するコード
  // throw new Error("Error in deleting goal");
  try {
    await axios.delete(`/goals/${goalId}`);
    mutate(`/users/${userId}/goals`);
  } catch (error) {
    console.error(error);
  }
};
