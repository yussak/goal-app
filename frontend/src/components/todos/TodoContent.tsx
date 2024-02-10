import { Todo } from "@/types";
import { Checkbox, IconButton } from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { useTodos } from "@/contexts/todoContext";

type props = {
  todo: Todo;
};

const TodoContent = ({ todo }: props) => {
  const { deleteTodo, updateTodoCheck } = useTodos();
  const handleCheckboxChange = (todoId: string, checked: boolean) => {
    updateTodoCheck(todoId, checked);
  };

  return (
    <>
      <Checkbox
        checked={todo.isCompleted}
        onChange={(e) => handleCheckboxChange(todo.id, e.target.checked)}
      />
      {todo.isCompleted ? (
        <span className="text-border">content: {todo.content}</span>
      ) : (
        <span>
          content: {todo.content}{" "}
          <IconButton aria-label="delete" onClick={() => deleteTodo(todo.id)}>
            <DeleteOutlineIcon />
          </IconButton>
        </span>
      )}
    </>
  );
};

export default TodoContent;
