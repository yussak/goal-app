import { Button, Container, Stack, TextField } from "@mui/material";

type EditGoalFormProps = {
  // setTitle: (title: string) => void;
  // setText: (text: string) => void;
  SetPurpose: (purpose: string) => void;
  SetLoss: (loss: string) => void;
  SetSmartSpecific: (smartSpecific: string) => void;
  SetSmartMeasurable: (smartMeasurable: string) => void;
  SetSmartAchievable: (smartAchievable: string) => void;
  SetSmartRelevant: (smartRelevant: string) => void;
  SetSmartTimeBound: (smartTimeBound: string) => void;
  setFile: (file: File | null) => void;
  editGoal: () => void;
  deleteGoalImage: () => void;
  // title: string;
  // text: string;
  purpose: string;
  loss: string;
  smartSpecific: string;
  smartMeasurable: string;
  smartAchievable: string;
  smartRelevant: string;
  smartTimeBound: string;
  imageURL: string | null;
  file: File | null;
};

const EditGoalForm = ({
  // setTitle,
  // setText,
  SetPurpose,
  SetLoss,
  SetSmartSpecific,
  SetSmartMeasurable,
  SetSmartAchievable,
  SetSmartRelevant,
  SetSmartTimeBound,
  setFile,
  editGoal,
  deleteGoalImage,
  // title,
  // text,
  purpose,
  loss,
  smartSpecific,
  smartMeasurable,
  smartAchievable,
  smartRelevant,
  smartTimeBound,
  imageURL,
}: EditGoalFormProps) => {
  return (
    <Container sx={{ pt: 3 }}>
      <Stack spacing={2}>
        {/* <TextField
          label="title"
          value={title}
          defaultValue={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <TextField
          label="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
        /> */}
        <TextField
          label="purpose"
          value={purpose}
          onChange={(e) => SetPurpose(e.target.value)}
        />
        <TextField
          label="loss"
          value={loss}
          onChange={(e) => SetLoss(e.target.value)}
        />
        <TextField
          label="smartSpecific"
          value={smartSpecific}
          onChange={(e) => SetSmartSpecific(e.target.value)}
        />
        <TextField
          label="smartMeasurable"
          value={smartMeasurable}
          onChange={(e) => SetSmartMeasurable(e.target.value)}
        />
        <TextField
          label="smartAchievable"
          value={smartAchievable}
          onChange={(e) => SetSmartAchievable(e.target.value)}
        />
        <TextField
          label="smartRelevant"
          value={smartRelevant}
          onChange={(e) => SetSmartRelevant(e.target.value)}
        />
        <TextField
          label="smartTimeBound"
          value={smartTimeBound}
          onChange={(e) => SetSmartTimeBound(e.target.value)}
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
