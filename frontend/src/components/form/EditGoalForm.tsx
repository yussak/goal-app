import { GoalFormData } from "@/types";
import { validationRules } from "@/utils/validationRules";
import { Button, Container, Stack, TextField } from "@mui/material";
import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

type EditGoalFormProps = {
  editGoal: (data: GoalFormData) => void;
  goalData: GoalFormData;
};

const EditGoalForm = ({ goalData, editGoal }: EditGoalFormProps) => {
  const {
    handleSubmit,
    formState: { errors, isValid },
    setValue,
    register,
  } = useForm<GoalFormData>({
    defaultValues: goalData,
    mode: "onChange",
  });
  const onSubmit: SubmitHandler<GoalFormData> = (data) => {
    editGoal(data);
  };

  useEffect(() => {
    setValue("content", goalData.content);
    setValue("purpose", goalData.purpose);
    setValue("loss", goalData.loss);
  }, [goalData]);

  return (
    <Container sx={{ pt: 3 }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={2}>
          <TextField
            {...register("content", validationRules)}
            error={!!errors.content}
            helperText={errors.content?.message}
          />
          <TextField
            {...register("purpose", validationRules)}
            error={!!errors.purpose}
            helperText={errors.purpose?.message}
          />
          <TextField
            {...register("loss", validationRules)}
            error={!!errors.loss}
            helperText={errors.loss?.message}
          />
          <Button type="submit" variant="contained" disabled={!isValid}>
            更新
          </Button>
        </Stack>
      </form>
    </Container>
  );
};

export default EditGoalForm;
