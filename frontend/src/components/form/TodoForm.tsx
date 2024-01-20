import { TodoFormData } from "@/types";
import { validationRules } from "@/utils/validationRules";
import { Button, Container, Stack, TextField } from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";

type TodoFormProps = {
  addTodoChild: (content: string) => void;
};

const TodoForm = ({ addTodoChild }: TodoFormProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<TodoFormData>({ mode: "onChange" });

  const onSubmit: SubmitHandler<TodoFormData> = (data) => {
    addTodoChild(data.content);
    reset();
  };

  return (
    <Container sx={{ pt: 3 }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={2} direction="row">
          <TextField
            label="content"
            {...register("content", validationRules)}
            error={!!errors.content}
            helperText={errors.content?.message}
          />
          <Button type="submit" variant="contained" disabled={!isValid}>
            追加
          </Button>
        </Stack>
      </form>
    </Container>
  );
};

export default TodoForm;
