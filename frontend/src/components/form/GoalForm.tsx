import { Button, Container, Stack, TextField } from "@mui/material";
import { RefObject } from "react";

type GoalFormProps = {
  // setTitle: (title: string) => void;
  // setText: (text: string) => void;
  SetSmartSpecific: (smart_specific: string) => void;
  SetSmartMeasurable: (smart_measurable: string) => void;
  SetSmartAchievable: (smart_achievable: string) => void;
  SetSmartRelevant: (smart_relevant: string) => void;
  SetSmartTimeBound: (smart_time_bound: string) => void;
  setFile: (file: File | null) => void;
  addGoal: () => void;
  // title: string;
  // text: string;
  smart_specific: string;
  smart_measurable: string;
  smart_achievable: string;
  smart_relevant: string;
  smart_time_bound: string;
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
  smart_specific,
  smart_measurable,
  smart_achievable,
  smart_relevant,
  smart_time_bound,
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
          label="smart_specific"
          value={smart_specific}
          onChange={(e) => SetSmartSpecific(e.target.value)}
        />
        <TextField
          label="smart_measurable"
          value={smart_measurable}
          onChange={(e) => SetSmartMeasurable(e.target.value)}
        />
        <TextField
          label="smart_achievable"
          value={smart_achievable}
          onChange={(e) => SetSmartAchievable(e.target.value)}
        />
        <TextField
          label="smart_relevant"
          value={smart_relevant}
          onChange={(e) => SetSmartRelevant(e.target.value)}
        />
        <TextField
          label="smart_time_bound"
          value={smart_time_bound}
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
