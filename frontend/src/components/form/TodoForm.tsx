import { validationRules } from "@/utils/validationRules";
import { Button, Container, Stack, TextField } from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";

type TodoFormProps = {
  setContent: (content: string) => void;
  addTodo: () => void;
  content: string;
};

const TodoForm = ({ setContent, addTodo, content }: TodoFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TodoFormProps>();

  const onSubmit: SubmitHandler<TodoFormProps> = () => {
    addTodo();
  };

  return (
    <Container sx={{ pt: 3 }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={2} direction="row">
          <TextField
            id="outlined-read-only-input"
            label="content"
            {...register("content", validationRules)}
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          {errors.content && (
            <span data-testid="error-content" className="text-red">
              {errors.content?.message}
            </span>
          )}
          <Button type="submit" variant="contained" disabled={!content}>
            追加
          </Button>
        </Stack>
      </form>
    </Container>
    // </Box>
  );
};

export default TodoForm;
