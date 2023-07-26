import { Button, Container, Stack, TextField } from "@mui/material";

type EditGoalFormProps = {
  setTitle: (title: string) => void;
  setText: (text: string) => void;
  setImageURL: (imageURL: string) => void;
  editGoal: () => void;
  title: string;
  text: string;
  imageURL: string | null;
};

const EditGoalForm = ({
  setTitle,
  setText,
  editGoal,
  title,
  text,
  imageURL,
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
        {imageURL ? (
          <>
            <p>画像あり（デバッグ用）</p>
            <img src={imageURL} alt="asdf" />
          </>
        ) : (
          <p>no image（デバッグ用）</p>
        )}

        <Button onClick={editGoal} variant="contained">
          更新
        </Button>
      </Stack>
    </Container>
  );
};

export default EditGoalForm;
