import { Button, Container, Stack, TextField } from "@mui/material";
import { RefObject } from "react";

type GoalFormProps = {
  SetPurpose: (purpose: string) => void;
  SetLoss: (loss: string) => void;
  SetSmartSpecific: (smartSpecific: string) => void;
  SetSmartMeasurable: (smartMeasurable: string) => void;
  SetSmartAchievable: (smartAchievable: string) => void;
  SetSmartRelevant: (smartRelevant: string) => void;
  SetSmartTimeBound: (smartTimeBound: string) => void;
  setFile: (file: File | null) => void;
  addGoal: () => void;
  purpose: string;
  loss: string;
  smartSpecific: string;
  smartMeasurable: string;
  smartAchievable: string;
  smartRelevant: string;
  smartTimeBound: string;
  inputRef: RefObject<HTMLInputElement>;
};

const GoalForm = ({
  SetPurpose,
  SetLoss,
  SetSmartSpecific,
  SetSmartMeasurable,
  SetSmartAchievable,
  SetSmartRelevant,
  SetSmartTimeBound,
  setFile,
  addGoal,
  purpose,
  loss,
  smartSpecific,
  smartMeasurable,
  smartAchievable,
  smartRelevant,
  smartTimeBound,
  inputRef,
}: GoalFormProps) => {
  return (
    <Container sx={{ pt: 3 }}>
      <Stack spacing={2}>
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
        <input
          type="file"
          ref={inputRef}
          onChange={(e) => {
            if (e.target.files) {
              setFile(e.target.files[0]);
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
