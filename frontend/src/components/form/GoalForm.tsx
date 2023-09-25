import { GoalFormData } from "@/types";
import { Button, Container, Stack, TextField } from "@mui/material";
import { RefObject } from "react";

type GoalFormProps = {
  SetGoalData: <K extends keyof GoalFormData>(
    key: K,
    value: GoalFormData[K]
  ) => void;
  addGoal: () => void;
  goalData: {
    purpose: string;
    loss: string;
    Specific: string;
    Measurable: string;
    Achievable: string;
    Relevant: string;
    TimeBound: string;
  };
  inputRef: RefObject<HTMLInputElement>;
};

const GoalForm = ({
  goalData,
  SetGoalData,
  addGoal,
  inputRef,
}: GoalFormProps) => {
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
          label="Specific"
          value={goalData.Specific}
          onChange={(e) => SetGoalData("Specific", e.target.value)}
        />
        <TextField
          label="Measurable"
          value={goalData.Measurable}
          onChange={(e) => SetGoalData("Measurable", e.target.value)}
        />
        <TextField
          label="smartAchievable"
          value={goalData.Achievable}
          onChange={(e) => SetGoalData("Achievable", e.target.value)}
        />
        <TextField
          label="Relevant"
          value={goalData.Relevant}
          onChange={(e) => SetGoalData("Relevant", e.target.value)}
        />
        <TextField
          label="TimeBound"
          value={goalData.TimeBound}
          onChange={(e) => SetGoalData("TimeBound", e.target.value)}
        />
        <p>やらないとどうなるかを書いてみましょう</p>
        <TextField
          label="loss"
          value={goalData.loss}
          onChange={(e) => SetGoalData("loss", e.target.value)}
        />
        <input
          type="file"
          ref={inputRef}
          onChange={(e) => {
            if (e.target.files) {
              SetGoalData("file", e.target.files[0]);
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
