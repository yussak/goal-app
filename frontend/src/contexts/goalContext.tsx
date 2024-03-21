import { Goal } from "@/types";
import { FC, ReactNode, createContext, useContext, useState } from "react";
import { mutate } from "swr";
import { useSession } from "next-auth/react";
import { axios } from "../utils/axios";

type ContextType = {
  goal: Goal | null;
  deleteGoal: (id: string) => void;
};

const GoalsContext = createContext<ContextType>({} as ContextType);

export const useGoals = () => useContext(GoalsContext);

// 状態を変更する関数ならhooks, そうじゃないならutilの方針で一旦進める
export const GoalsProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const { data: session } = useSession();
  const [goal, setGoal] = useState<Goal | null>(null);
  const userId = session?.user ? session.user.id : null;

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
    deleteGoal,
  };

  return (
    <GoalsContext.Provider value={value}>{children}</GoalsContext.Provider>
  );
};
