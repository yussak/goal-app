import { useSession } from "next-auth/react";
import { axios } from "@/utils/axios";
import { Todo } from "@/types";
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
  addTodo: (parentId: string, content: string) => void;
  deleteTodo: (todoId: string) => void;
  updateTodoCheck: (todoId: string, isCompleted: boolean) => void;
};

const TodoContext = createContext<ContextType>({} as ContextType);

export const useTodos = () => useContext(TodoContext);

export const TodoProvider: FC<{ children: ReactNode }> = ({ children }) => {
  // todosは「キーがstring、バリューがTodo型の配列」のオブジェクトである
  // 各マイルストーンに対するtodoを扱うためキーを使用している
  const [todos, setTodos] = useState<{ [key: string]: Todo[] }>({});
  const { milestones } = useMilestone();
  const { data: session } = useSession();

  useEffect(() => {
    fetchTodos();
  }, [milestones]);

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

  const addTodo = async (parentId: string, content: string) => {
    const params = {
      parentId: parentId,
      userId: session?.user?.id,
      content: content,
    };

    try {
      const res = await axios.post(`/milestones/${parentId}/todos`, params);
      // 親側で更新
      addTodosToState(parentId, res.data);
    } catch (error) {
      console.error(error);
    }
  };

  // addTodo時にstateのtodosを更新する
  // todo:型をちゃんと書く
  const addTodosToState = (milestoneId: string, newTodo: any) => {
    const updatedTodos = {
      ...todos,
      [milestoneId]: [...todos[milestoneId], newTodo],
    };
    setTodos(updatedTodos);
  };

  const deleteTodo = async (todoId: string) => {
    try {
      await axios.delete(`/todos/${todoId}`);
      await fetchTodos();
    } catch (error) {
      console.error(error);
    }
  };

  const updateTodoCheck = async (todoId: string, isCompleted: boolean) => {
    try {
      await axios.put(`/todos/${todoId}/isCompleted`, { isCompleted });
      fetchTodos();
    } catch (error) {
      console.error(error);
    }
  };

  const value = {
    todos,
    fetchTodos,
    addTodo,
    deleteTodo,
    updateTodoCheck,
  };

  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
};
