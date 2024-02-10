import { Milestone, MilestoneFormData, Todo } from "@/types";
import { axios } from "@/utils/axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import {
  FC,
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { useMilestone } from "./mileContext";

type ContextType = {
  fetchTodos: () => void;
  todos: { [key: string]: Todo[] };
};

const TodoContext = createContext<ContextType>({} as ContextType);

export const useTodos = () => useContext(TodoContext);

export const TodoProvider: FC<{ children: ReactNode }> = ({ children }) => {
  // todosは「キーがstring、バリューがTodo型の配列」のオブジェクトである
  // 各マイルストーンに対するtodoを扱うためキーを使用している
  const [todos, setTodos] = useState<{ [key: string]: Todo[] }>({});
  const { milestones } = useMilestone();

  useEffect(() => {
    fetchTodos();
  }, [milestones]);

  // todo:todo contextに移動
  const fetchTodos = async () => {
    let newTodos = { ...todos };
    for (let milestone of milestones) {
      try {
        const { data } = await axios.get(`/milestones/${milestone.id}/todos`);
        console.log("datata", data);
        newTodos[milestone.id] = data;
      } catch (error) {
        console.error(error);
      }
    }
    setTodos(newTodos);
  };

  const value = {
    fetchTodos,
    todos,
  };

  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
};
