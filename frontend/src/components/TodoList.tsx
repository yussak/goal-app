import { Todo } from "@/types";
import { Checkbox } from "@mui/material";

type TodoListProps = {
  todos: Todo[];
  onDeleteTodo: (id: string) => void;
  onUpdateTodoCheck: (id: string, checked: boolean) => void;
  milestoneId?: string;
};

const TodoList = ({
  todos,
  milestoneId,
  onDeleteTodo,
  onUpdateTodoCheck,
}: TodoListProps) => {
  const handleCheckboxChange = (todoId: string, checked: boolean) => {
    onUpdateTodoCheck(todoId, checked);
  };

  return (
    <div>
      <h3>Milestone（デバッグ用）: {milestoneId}</h3>
      {todos.length > 0 ? (
        <ul>
          {todos.map((todo, index) => (
            <li key={index}>
              <div>
                <Checkbox
                  checked={todo.is_completed}
                  onChange={(e) =>
                    handleCheckboxChange(todo.id, e.target.checked)
                  }
                />
                {todo.is_completed ? (
                  <span className="text-border">content: {todo.content}</span>
                ) : (
                  <span>content: {todo.content}</span>
                )}
              </div>
              {/* <p>進捗状況（デバッグ用）: {todo.is_completed.toString()}</p> */}
              <button onClick={() => onDeleteTodo(todo.id)}>delete</button>
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
