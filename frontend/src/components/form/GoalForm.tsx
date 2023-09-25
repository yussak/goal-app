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
    specific: string;
    measurable: string;
    achievable: string;
    relevant: string;
    timeBound: string;
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
          label="specific"
          value={goalData.specific}
          onChange={(e) => SetGoalData("specific", e.target.value)}
        />
        <TextField
          label="measurable"
          value={goalData.measurable}
          onChange={(e) => SetGoalData("measurable", e.target.value)}
        />
        <TextField
          label="smartachievable"
          value={goalData.achievable}
          onChange={(e) => SetGoalData("achievable", e.target.value)}
        />
        <TextField
          label="relevant"
          value={goalData.relevant}
          onChange={(e) => SetGoalData("relevant", e.target.value)}
        />
        <TextField
          label="timeBound"
          value={goalData.timeBound}
          onChange={(e) => SetGoalData("timeBound", e.target.value)}
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
