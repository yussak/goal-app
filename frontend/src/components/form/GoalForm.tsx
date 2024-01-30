import { GoalFormData } from "@/types/GoalForm";
import {
  optionalValidationRules,
  requireValidationRules,
} from "@/utils/validationRules";
import { Button, Container, Stack, TextField } from "@mui/material";
import { FieldErrors, SubmitHandler, useForm } from "react-hook-form";
import { useTranslation } from "next-i18next";

type GoalFormProps = {
  addGoal: (data: GoalFormData) => void;
};

const GoalForm = ({ addGoal }: GoalFormProps) => {
  const { t } = useTranslation();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<GoalFormData>({ mode: "onChange" });

  const onSubmit: SubmitHandler<GoalFormData> = (data) => {
    addGoal(data);
  };

  const renderTextField = (
    name: string,
    // todo:anyじゃなくしたい
    register: any,
    validationRules: any,
    errors: FieldErrors
  ) => {
    return (
      <Stack spacing={2}>
        <TextField
          label={name}
          id={name}
          {...register(name, validationRules)}
          error={!!errors[name]}
          helperText={errors[name]?.message}
          data-testid={`error-${name}`}
        />
      </Stack>
    );
  };

  return (
    <Container>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="content">{t("goal_create.label1")}</label>
        {renderTextField("content", register, requireValidationRules, errors)}
        <label htmlFor="purpose">{t("goal_create.label2")}</label>
        {renderTextField("purpose", register, requireValidationRules, errors)}
        <label htmlFor="loss">{t("goal_create.label3")}</label>
        {renderTextField("loss", register, optionalValidationRules, errors)}
        <Button type="submit" variant="contained" disabled={!isValid}>
          追加
        </Button>
      </form>
    </Container>
  );
};

export default GoalForm;
