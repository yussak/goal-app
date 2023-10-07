import { GoalFormData } from "@/types";
import { Button, Container, Stack, TextField } from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";

type EditGoalFormProps = {
  SetGoalData: <K extends keyof GoalFormData>(
    key: K,
    value: GoalFormData[K]
  ) => void;
  editGoal: (data: GoalFormData) => void;
  goalData: {
    purpose: string;
    loss: string;
    smartSpecific: string;
    smartMeasurable: string;
    smartAchievable: string;
    smartRelevant: string;
    smartTimeBound: string;
  };
};

const EditGoalForm = ({
  goalData,
  SetGoalData,
  editGoal,
}: EditGoalFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<GoalFormData>();

  const onSubmit: SubmitHandler<GoalFormData> = (data) => {
    editGoal(data);
  };

  return (
    <Container sx={{ pt: 3 }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={2}>
          <TextField
            label="purpose"
            {...register("purpose", {
              required: "必須です",
              minLength: { value: 3, message: "3文字以上入力してください" },
              maxLength: { value: 5, message: "5文字以内で入力してください" },
            })}
            value={goalData.purpose}
            onChange={(e) => SetGoalData("purpose", e.target.value)}
          />
          {errors.purpose && (
            <span className="text-red">{errors.purpose.message}</span>
          )}
          <TextField
            label="loss"
            {...register("loss", {
              minLength: { value: 3, message: "3文字以上入力してください" },
              maxLength: { value: 5, message: "5文字以内で入力してください" },
            })}
            value={goalData.loss}
            onChange={(e) => SetGoalData("loss", e.target.value)}
          />
          {errors.loss && (
            <span className="text-red">{errors.loss.message}</span>
          )}
          <TextField
            label="smartSpecific"
            value={goalData.smartSpecific}
            onChange={(e) => SetGoalData("smartSpecific", e.target.value)}
          />
          <TextField
            label="smartMeasurable"
            value={goalData.smartMeasurable}
            onChange={(e) => SetGoalData("smartMeasurable", e.target.value)}
          />
          <TextField
            label="smartAchievable"
            value={goalData.smartAchievable}
            onChange={(e) => SetGoalData("smartAchievable", e.target.value)}
          />
          <TextField
            label="smartRelevant"
            value={goalData.smartRelevant}
            onChange={(e) => SetGoalData("smartRelevant", e.target.value)}
          />
          <TextField
            label="smartTimeBound"
            value={goalData.smartTimeBound}
            onChange={(e) => SetGoalData("smartTimeBound", e.target.value)}
          />
          <Button type="submit" variant="contained">
            更新
          </Button>
        </Stack>
      </form>
    </Container>
  );
};

export default EditGoalForm;
