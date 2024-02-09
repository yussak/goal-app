import { GoalFormData } from "@/types";
import { validationRules } from "@/utils/validationRules";
import {
  Button,
  Container,
  MenuItem,
  Select,
  Stack,
  TextField,
} from "@mui/material";
import { useEffect } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useTranslation } from "next-i18next";

type EditGoalFormProps = {
  editGoal: (data: GoalFormData) => void;
  goalData: GoalFormData;
};

const EditGoalForm = ({ goalData, editGoal }: EditGoalFormProps) => {
  const { t } = useTranslation();

  const {
    handleSubmit,
    formState: { errors, isValid },
    setValue,
    register,
    control,
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
    setValue("phase", goalData.phase);
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
          <Controller
            control={control}
            name="phase"
            defaultValue={goalData.phase}
            rules={{
              validate: (value) => ["予定", "WIP", "完了"].includes(value),
            }}
            render={({ field }) => (
              <Select {...field}>
                <MenuItem value="予定">{t("goal.phase_scheduled")}</MenuItem>
                <MenuItem value="WIP">{t("goal.phase_wip")}</MenuItem>
                <MenuItem value="完了">{t("goal.phase_done")}</MenuItem>
              </Select>
            )}
          ></Controller>
          {errors?.phase && <p>invalid value.</p>}
          <Button type="submit" variant="contained" disabled={!isValid}>
            {t("edit_goal_form.button")}
          </Button>
        </Stack>
      </form>
    </Container>
  );
};

export default EditGoalForm;
