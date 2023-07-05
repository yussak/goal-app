import { Box, Button, Stack, TextField } from "@mui/material";

type GoalFormProps = {
  setTitle: (title: string) => void;
  setText: (text: string) => void;
  addGoal: () => void;
  title: string;
  text: string;
};

const GoalForm = ({
  setTitle,
  setText,
  addGoal,
  title,
  text,
}: GoalFormProps) => {
  return (
    <Box component="form" noValidate autoComplete="off">
      <Stack spacing={2} direction="row">
        <TextField
          id="outlined-read-only-input"
          label="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <TextField
          id="outlined-read-only-input"
          label="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <Button onClick={addGoal} variant="contained">
          追加
        </Button>
      </Stack>
    </Box>
  );
};

export default GoalForm;
