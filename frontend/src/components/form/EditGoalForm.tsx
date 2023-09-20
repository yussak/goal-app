import { GoalFormData } from "@/types";
import { Button, Container, Stack, TextField } from "@mui/material";

type EditGoalFormProps = {
  SetGoalData: <K extends keyof GoalFormData>(
    key: K,
    value: GoalFormData[K]
  ) => void;
  editGoal: () => void;
  deleteGoalImage: () => void;
  goalData: {
    purpose: string;
    loss: string;
    smartSpecific: string;
    smartMeasurable: string;
    smartAchievable: string;
    smartRelevant: string;
    smartTimeBound: string;
    file: File | null;
    imageURL: string | null;
  };
};

const EditGoalForm = ({
  goalData,
  SetGoalData,
  editGoal,
  deleteGoalImage,
}: EditGoalFormProps) => {
  return (
    <Container sx={{ pt: 3 }}>
      <Stack spacing={2}>
        <TextField
          label="purpose"
          value={goalData.purpose}
          onChange={(e) => SetGoalData("purpose", e.target.value)}
        />
        <TextField
          label="loss"
          value={goalData.loss}
          onChange={(e) => SetGoalData("loss", e.target.value)}
        />
        <TextField
          label="smartSpecific"
          value={goalData.smartSpecific}
          onChange={(e) => SetGoalData("smartSpecific", e.target.value)}
        />
        <TextField
          label="smartMeasurable"
          value={goalData.smartMeasurable}
          onChange={(e) => SetGoalData("smartMeasurable", e.target.value)}
        />
        <TextField
          label="smartAchievable"
          value={goalData.smartAchievable}
          onChange={(e) => SetGoalData("smartAchievable", e.target.value)}
        />
        <TextField
          label="smartRelevant"
          value={goalData.smartRelevant}
          onChange={(e) => SetGoalData("smartRelevant", e.target.value)}
        />
        <TextField
          label="smartTimeBound"
          value={goalData.smartTimeBound}
          onChange={(e) => SetGoalData("smartTimeBound", e.target.value)}
        />
        {goalData.imageURL ? (
          <>
            <p>画像あり（デバッグ用）</p>
            <button onClick={deleteGoalImage}>画像削除</button>
            <img className="image_box" src={goalData.imageURL} alt="asdf" />
          </>
        ) : (
          <p>no image（デバッグ用）</p>
        )}
        <input
          type="file"
          onChange={(e) => {
            if (e.target.files) {
              SetGoalData("file", e.target.files[0]);
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
