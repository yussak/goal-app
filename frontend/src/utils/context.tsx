import { Goal } from "@/types";
import { FC, ReactNode, createContext, useContext } from "react";
import useSWR from "swr";
import { fetcher } from "./fetcher";
import { useSession } from "next-auth/react";

const GoalsContext = createContext<Goal[] | null>(null);

export const useGoals = () => useContext(GoalsContext);

export const GoalsProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const { data: session } = useSession();
  const userId = session?.user ? session.user.id : null;

  const { data: goals, error } = useSWR<Goal[]>(`/${userId}/goals`, fetcher);
  if (error) {
    console.error(error);
  }

  return (
    <GoalsContext.Provider value={goals || null}>
      {children}
    </GoalsContext.Provider>
  );
};
