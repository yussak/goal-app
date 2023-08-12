import { Button, Container, Stack, TextField } from "@mui/material";
import { RefObject } from "react";

type GoalFormProps = {
  setTitle: (title: string) => void;
  setText: (text: string) => void;
  setFile: (file: File | null) => void;
  addGoal: () => void;
  title: string;
  text: string;
  inputRef: RefObject<HTMLInputElement>;
};

const GoalForm = ({
  setTitle,
  setText,
  setFile,
  addGoal,
  title,
  text,
  inputRef,
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
        <input
          type="file"
          ref={inputRef}
          onChange={(e) => {
            if (e.target.files) {
              setFile(e.target.files[0]);
            }
          }}
        />
        <Button onClick={addGoal} variant="contained">
          追加
        </Button>
      </Stack>
    </Container>
  );
};

export default GoalForm;
