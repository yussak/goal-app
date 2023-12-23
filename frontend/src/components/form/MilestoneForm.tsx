import { Box, Button, Stack, TextField } from "@mui/material";

type MilestoneFormProps = {
  setContent: (content: string) => void;
  addMilestone: () => void;
  content: string;
};

const MilestoneForm = ({
  setContent,
  addMilestone,
  content,
}: MilestoneFormProps) => {
  // TODO:react-hook-formで書き換える
  return (
    <Box component="form" noValidate autoComplete="off">
      <Stack spacing={2} direction="row">
        <TextField
          id="outlined-read-only-input"
          label="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <Button onClick={addMilestone} variant="contained">
          追加
        </Button>
      </Stack>
    </Box>
  );
};

export default MilestoneForm;
