import { Goal, GoalFormData } from "@/types";
import { FC, ReactNode, createContext, useContext, useState } from "react";
import { mutate } from "swr";
import { useSession } from "next-auth/react";
import { axios } from "../utils/axios";
import { useRouter } from "next/router";

type ContextType = {
  goal: Goal | null;
  addGoal: (data: GoalFormData) => void;
  deleteGoal: (id: string) => void;
};

const GoalsContext = createContext<ContextType>({} as ContextType);

export const useGoals = () => useContext(GoalsContext);

// 状態を変更する関数ならcontext, そうじゃないならutilの方針で一旦進める;
export const GoalsProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const { data: session } = useSession();
  const [goal, setGoal] = useState<Goal | null>(null);
  const userId = session?.user ? session.user.id : null;
  const router = useRouter();
  const goalId = router.query.id;

  // 一箇所でしか使ってないのでそこに書く？いや今後作成処理の場所を変える可能性はありそうだが、ここにあれば読み込むだけで済むので残す。ただcontextじゃなくmodulesに移動するとは思う
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

  const deleteGoal = async (goalId: string) => {
    // 意図的にエラー出してダイアログ消えないことを確認するコード
    // throw new Error("Error in deleting goal");
    try {
      await axios.delete(`/goal/${goalId}`);
      mutate(`/${userId}/goals`);
    } catch (error) {
      console.error(error);
    }
  };

  const value = {
    goal,
    addGoal,
    deleteGoal,
  };

  return (
    <GoalsContext.Provider value={value}>{children}</GoalsContext.Provider>
  );
};
