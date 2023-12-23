import { Todo } from "@/types";

type TodoListProps = {
  todos: Todo[];
  onDeleteTodo: (id: string) => void;
  milestoneId?: string;
};

const TodoList = ({ todos, milestoneId, onDeleteTodo }: TodoListProps) => {
  return (
    <div>
      <h3>Milestone（デバッグ用）: {milestoneId}</h3>
      {todos.length > 0 ? (
        <ul>
          {todos.map((todo, index) => (
            <li key={index}>
              <p>content: {todo.content}</p>
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
