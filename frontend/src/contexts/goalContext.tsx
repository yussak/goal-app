import { Goal } from "@/types";
import { FC, ReactNode, createContext, useContext, useState } from "react";
import { useSession } from "next-auth/react";

type ContextType = {
  goal: Goal | null;
};

const GoalsContext = createContext<ContextType>({} as ContextType);

export const useGoals = () => useContext(GoalsContext);

// 状態を変更する関数ならhooks, そうじゃないならutilの方針で一旦進める
// todo:その方針ならcontextの必要性がわからないので確認
export const GoalsProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const { data: session } = useSession();
  const [goal, setGoal] = useState<Goal | null>(null);
  const userId = session?.user ? session.user.id : null;

  const value = {
    goal,
  };

  return (
    <GoalsContext.Provider value={value}>{children}</GoalsContext.Provider>
  );
};
