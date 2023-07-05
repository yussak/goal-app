import { Box, Button, Stack, TextField } from "@mui/material";

type GoalCommentFormProps = {
  setTitle: (title: string) => void;
  setText: (text: string) => void;
  addComment: () => void;
  title: string;
  text: string;
};

const GoalCommentForm = ({
  setTitle,
  setText,
  addComment,
  title,
  text,
}: GoalCommentFormProps) => {
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
        <Button onClick={addComment} variant="contained">
          追加
        </Button>
      </Stack>
    </Box>
  );
};

export default GoalCommentForm;
