import { GoalFormData } from "@/types/GoalForm";
import {
  optionalValidationRules,
  requireValidationRules,
} from "@/utils/validationRules";
import { Button, Container, Stack, TextField } from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";
import { useTranslation } from "next-i18next";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { addGoal } from "@/utils/goals";

const GoalForm = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const { t } = useTranslation();
  const userId = session?.user ? session.user.id : null;

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<GoalFormData>({ mode: "onChange" });

  const onSubmit: SubmitHandler<GoalFormData> = async (data) => {
    if (!userId) {
      console.error("userId is undefined");
      return;
    }

    try {
      const newGoalData = { ...data, userId };
      const newGoalId = await addGoal(newGoalData);
      router.push(`/goals/${newGoalId}`);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Container>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={2}>
          <label htmlFor="content">{t("goal_create.label1")}</label>
          <TextField
            label="content"
            id="content"
            {...register("content", requireValidationRules)}
            error={!!errors.content}
            helperText={errors.content?.message}
            data-testid="error-content"
          />

          <label htmlFor="purpose">{t("goal_create.label2")}</label>
          <TextField
            label="purpose"
            id="purpose"
            {...register("purpose", optionalValidationRules)}
            error={!!errors.purpose}
            helperText={errors.purpose?.message}
            data-testid="error-purpose"
          />

          <label htmlFor="benefit">{t("goal_create.label3")}</label>
          <TextField
            label="benefit"
            id="benefit"
            {...register("benefit", optionalValidationRules)}
            error={!!errors.benefit}
            helperText={errors.benefit?.message}
            data-testid="error-benefit"
          />
          <Button type="submit" variant="contained" disabled={!isValid}>
            追加
          </Button>
        </Stack>
      </form>
    </Container>
  );
};

export default GoalForm;
