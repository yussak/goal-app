import { Button, Container, Stack, TextField } from "@mui/material";

type EditGoalFormProps = {
  setTitle: (title: string) => void;
  setText: (text: string) => void;
  setFile: (file: File | null) => void;
  editGoal: () => void;
  deleteGoalImage: () => void;
  title: string;
  text: string;
  imageURL: string | null;
  file: File | null;
};

const EditGoalForm = ({
  setTitle,
  setText,
  setFile,
  editGoal,
  deleteGoalImage,
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
            <button onClick={deleteGoalImage}>画像削除</button>
            <img className="image_box" src={imageURL} alt="asdf" />
          </>
        ) : (
          <p>no image（デバッグ用）</p>
        )}
        <input
          type="file"
          onChange={(e) => {
            if (e.target.files) {
              setFile(e.target.files[0]);
            }
          }}
        />
        <Button onClick={editGoal} variant="contained">
          更新
        </Button>
      </Stack>
    </Container>
  );
};

export default EditGoalForm;
