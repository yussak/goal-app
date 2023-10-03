import { GoalFormData } from "@/types";
import { Button, Container, Stack, TextField } from "@mui/material";
// import { RefObject } from "react";

type GoalFormProps = {
  SetGoalData: <K extends keyof GoalFormData>(
    key: K,
    value: GoalFormData[K]
  ) => void;
  addGoal: () => void;
  goalData: {
    purpose: string;
    loss: string;
    smartSpecific: string;
    smartMeasurable: string;
    smartAchievable: string;
    smartRelevant: string;
    smartTimeBound: string;
  };
  // inputRef: RefObject<HTMLInputElement>;
};

const GoalForm = ({
  goalData,
  SetGoalData,
  addGoal,
}: // inputRef,
GoalFormProps) => {
  return (
    <Container sx={{ pt: 3 }}>
      <Stack spacing={2}>
        <p>達成したいことを書きましょう（必須）</p>
        <TextField
          label="purpose"
          value={goalData.purpose}
          onChange={(e) => SetGoalData("purpose", e.target.value)}
        />
        <p>それをSMARTに書きましょう（必須）</p>
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
        <p>やらないとどうなるかを書いてみましょう</p>
        <TextField
          label="loss"
          value={goalData.loss}
          onChange={(e) => SetGoalData("loss", e.target.value)}
        />
        {/* <input
          type="file"
          ref={inputRef}
          onChange={(e) => {
            if (e.target.files) {
              SetGoalData("file", e.target.files[0]);
            }
          }}
        /> */}
        <Button onClick={addGoal} variant="contained">
          追加
        </Button>
      </Stack>
    </Container>
  );
};

export default GoalForm;
