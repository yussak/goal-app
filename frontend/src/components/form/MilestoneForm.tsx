import { validationRules } from "@/utils/validationRules";
import { Button, Container, Stack, TextField } from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";

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
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<MilestoneFormProps>();

  const onSubmit: SubmitHandler<MilestoneFormProps> = () => {
    addMilestone();
  };

  return (
    <Container sx={{ pt: 3 }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={2} direction="row">
          <TextField
            label="content"
            {...register("content", validationRules)}
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          {errors.content && (
            <span data-testid="error-content" className="text-red">
              {errors.content?.message}
            </span>
          )}
          <Button type="submit" variant="contained" disabled={!content}>
            追加
          </Button>
        </Stack>
      </form>
    </Container>
  );
};

export default MilestoneForm;
