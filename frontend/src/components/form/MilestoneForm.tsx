import { MilestoneFormData } from "@/types";
import { validationRules } from "@/utils/validationRules";
import { Button, Container, Stack, TextField } from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";

type MilestoneFormProps = {
  addMilestone: (data: MilestoneFormData) => void;
};

const MilestoneForm = ({ addMilestone }: MilestoneFormProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<MilestoneFormData>({ mode: "onChange" });

  const onSubmit: SubmitHandler<MilestoneFormData> = (data) => {
    addMilestone(data);
    reset();
  };

  return (
    <Container sx={{ pt: 3 }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={2} direction="row">
          <TextField
            label="content"
            {...register("content", validationRules)}
          />
          {errors.content && (
            <span data-testid="error-content" className="text-red">
              {errors.content?.message}
            </span>
          )}
          <Button type="submit" variant="contained" disabled={!isValid}>
            追加
          </Button>
        </Stack>
      </form>
    </Container>
  );
};

export default MilestoneForm;
