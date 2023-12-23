import { Box, Button, Stack, TextField } from "@mui/material";

type TodoFormProps = {
  setContent: (content: string) => void;
  addTodo: () => void;
  content: string;
};

const TodoForm = ({ setContent, addTodo, content }: TodoFormProps) => {
  // TODO:react-hook-formで書き換える
  return (
    <Box component="form" noValidate autoComplete="off">
      <Stack spacing={2} direction="row">
        <TextField
          id="outlined-read-only-input"
          label="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <Button onClick={addTodo} variant="contained">
          追加
        </Button>
      </Stack>
    </Box>
  );
};

export default TodoForm;
