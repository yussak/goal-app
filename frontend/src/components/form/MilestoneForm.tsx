import { MilestoneFormData } from "@/types";
import { validationRules } from "@/utils/validationRules";
import { Button, Container, Stack, TextField } from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";
import { useTranslation } from "next-i18next";
import { useMilestone } from "@/contexts/mileContext";

const MilestoneForm = () => {
  const { t } = useTranslation();
  const { addMilestone } = useMilestone();

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
        <h3>
          <label htmlFor="content">{t("goal_detail.title2")}</label>
        </h3>
        <Stack spacing={2} direction="row">
          <TextField
            label="content"
            id="content"
            {...register("content", validationRules)}
            error={!!errors.content}
            helperText={errors.content?.message}
            data-testid="error-content"
          />
          <Button type="submit" variant="contained" disabled={!isValid}>
            {t("milestone_form.button1")}
          </Button>
        </Stack>
      </form>
    </Container>
  );
};

export default MilestoneForm;
