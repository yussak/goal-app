import { GoalFormData } from "@/types";
import { Button, Container, Stack, TextField } from "@mui/material";
import { RefObject } from "react";

type GoalFormProps = {
  SetGoalData: <K extends keyof GoalFormData>(
    key: K,
    value: GoalFormData[K]
  ) => void;

  // SetPurpose: (purpose: string) => void;
  // SetLoss: (loss: string) => void;
  // SetSmartSpecific: (smartSpecific: string) => void;
  // SetSmartMeasurable: (smartMeasurable: string) => void;
  // SetSmartAchievable: (smartAchievable: string) => void;
  // SetSmartRelevant: (smartRelevant: string) => void;
  // SetSmartTimeBound: (smartTimeBound: string) => void;
  // setFile: (file: File | null) => void;
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
  inputRef: RefObject<HTMLInputElement>;
};

const GoalForm = ({
  // SetPurpose,
  SetGoalData,
  // SetLoss,
  // SetSmartSpecific,
  // SetSmartMeasurable,
  // SetSmartAchievable,
  // SetSmartRelevant,
  // SetSmartTimeBound,
  // setFile,
  addGoal,
  // purpose,
  // loss,
  // smartSpecific,
  // smartMeasurable,
  // smartAchievable,
  // smartRelevant,
  // smartTimeBound,
  goalData,
  inputRef,
}: GoalFormProps) => {
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
          // onChange={(e) => SetLoss(e.target.value)}
          onChange={(e) => SetGoalData("loss", e.target.value)}
        />
        <TextField
          label="smartSpecific"
          value={goalData.smartSpecific}
          // onChange={(e) => SetSmartSpecific(e.target.value)}
          onChange={(e) => SetGoalData("smartSpecific", e.target.value)}
        />
        <TextField
          label="smartMeasurable"
          value={goalData.smartMeasurable}
          // onChange={(e) => SetSmartMeasurable(e.target.value)}
          onChange={(e) => SetGoalData("smartMeasurable", e.target.value)}
        />
        <TextField
          label="smartAchievable"
          value={goalData.smartAchievable}
          // onChange={(e) => SetSmartAchievable(e.target.value)}
          onChange={(e) => SetGoalData("smartAchievable", e.target.value)}
        />
        <TextField
          label="smartRelevant"
          value={goalData.smartRelevant}
          // onChange={(e) => SetSmartRelevant(e.target.value)}
          onChange={(e) => SetGoalData("smartRelevant", e.target.value)}
        />
        <TextField
          label="smartTimeBound"
          value={goalData.smartTimeBound}
          // onChange={(e) => SetSmartTimeBound(e.target.value)}
          onChange={(e) => SetGoalData("smartTimeBound", e.target.value)}
        />
        <input
          type="file"
          ref={inputRef}
          onChange={(e) => {
            if (e.target.files) {
              // setFile(e.target.files[0]);
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
