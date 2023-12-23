import { Todo } from "@/types";
import { useSession } from "next-auth/react";

type TodoListProps = {
  todos: Todo[];
  //   onDelete: (id: string) => void;
  milestoneId?: string;
};

const TodoList = ({ todos, milestoneId }: TodoListProps) => {
  // const TodoList = ({ todos, onDelete }: TodoListProps) => {
  const { data: session } = useSession();

  return (
    <div>
      <h3>Milestone（デバッグ用）: {milestoneId}</h3>
      {todos.length > 0 ? (
        <ul>
          {todos.map((todo, index) => (
            <li key={index}>
              <p>content: {todo.content}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>このマイルストーンにToDoはありません</p>
      )}
    </div>
  );
};

export default TodoList;
