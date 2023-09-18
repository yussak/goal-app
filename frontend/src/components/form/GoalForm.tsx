import { Button, Container, Stack, TextField } from "@mui/material";
import { RefObject } from "react";

type GoalFormProps = {
  // setTitle: (title: string) => void;
  // setText: (text: string) => void;
  SetSmartSpecific: (smartSpecific: string) => void;
  SetSmartMeasurable: (smartMeasurable: string) => void;
  SetSmartAchievable: (smartAchievable: string) => void;
  SetSmartRelevant: (smartRelevant: string) => void;
  SetSmartTimeBound: (smartTimeBound: string) => void;
  setFile: (file: File | null) => void;
  addGoal: () => void;
  // title: string;
  // text: string;
  smartSpecific: string;
  smartMeasurable: string;
  smartAchievable: string;
  smartRelevant: string;
  smartTimeBound: string;
  inputRef: RefObject<HTMLInputElement>;
};

const GoalForm = ({
  // setTitle,
  // setText,
  SetSmartSpecific,
  SetSmartMeasurable,
  SetSmartAchievable,
  SetSmartRelevant,
  SetSmartTimeBound,
  setFile,
  addGoal,
  // title,
  // text,
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
        {/* <TextField
          label="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <TextField
          label="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
        /> */}
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
