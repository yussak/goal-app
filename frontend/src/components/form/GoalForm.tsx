import { Button, Container, Stack, TextField } from "@mui/material";

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
    <Container sx={{ pt: 3 }}>
      <Stack spacing={2}>
        <TextField
          label="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <TextField
          label="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        {/* TODO:画像追加を実装 */}
        <input type="file" />
        <Button onClick={addGoal} variant="contained">
          追加
        </Button>
      </Stack>
    </Container>
  );
};

export default GoalForm;
