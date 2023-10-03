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
  };
};

const EditGoalForm = ({
  goalData,
  SetGoalData,
  editGoal,
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
        <Button onClick={editGoal} variant="contained">
          更新
        </Button>
      </Stack>
    </Container>
  );
};

export default EditGoalForm;
