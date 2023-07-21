import { Button, Container, Stack, TextField } from "@mui/material";

type EditGoalFormProps = {
  setTitle: (title: string) => void;
  setText: (text: string) => void;
  editGoal: () => void;
  title: string;
  text: string;
};

const EditGoalForm = ({
  setTitle,
  setText,
  editGoal,
  title,
  text,
}: EditGoalFormProps) => {
  return (
    <Container sx={{ pt: 3 }}>
      <Stack spacing={2}>
        <TextField
          label="title"
          value={title}
          defaultValue={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <TextField
          label="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <Button onClick={editGoal} variant="contained">
          更新
        </Button>
      </Stack>
    </Container>
  );
};

export default EditGoalForm;
