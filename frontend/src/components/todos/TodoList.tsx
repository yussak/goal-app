import { Todo } from "@/types";
import TodoContent from "./TodoContent";

type TodoListProps = {
  todos: Todo[];
  onDeleteTodo: (id: string) => void;
  onUpdateTodoCheck: (id: string, checked: boolean) => void;
  milestoneId?: string;
};

const TodoList = ({ todos }: TodoListProps) => {
  return (
    <>
      {todos.length > 0 ? (
        <ul>
          {todos.map((todo, index) => (
            <li key={index}>
              <TodoContent todo={todo} />
            </li>
          ))}
        </ul>
      ) : (
        <p>このマイルストーンにToDoはありません</p>
      )}
    </>
  );
};

export default TodoList;
