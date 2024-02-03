import { Goal } from "@/types";
import { FC, ReactNode, createContext, useContext } from "react";
import useSWR, { mutate } from "swr";
import { fetcher } from "../utils/fetcher";
import { useSession } from "next-auth/react";
import { axios } from "../utils/axios";

type ContextType = {
  goals: Goal[] | null;
  deleteGoal: (id: string) => void;
};

const GoalsContext = createContext<ContextType>({} as ContextType);

export const useGoals = () => useContext(GoalsContext);

export const GoalsProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const { data: session } = useSession();
  const userId = session?.user ? session.user.id : null;

  const { data: goals, error } = useSWR<Goal[]>(`/${userId}/goals`, fetcher);
  if (error) {
    console.error(error);
  }

  const deleteGoal = async (id: string) => {
    // 意図的にエラー出してダイアログ消えないことを確認するコード
    // throw new Error("Error in deleting goal");
    try {
      await axios.delete(`/goal/${id}`);
      mutate(`/${userId}/goals`);
    } catch (error) {
      console.error(error);
    }
  };

  const value = {
    goals: goals || null,
    deleteGoal,
  };

  return (
    <GoalsContext.Provider value={value}>{children}</GoalsContext.Provider>
  );
};
