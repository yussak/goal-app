import { GoalFormData } from "@/types";
import { Button, Container, Stack, TextField } from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";

type GoalFormProps = {
  SetGoalData: <K extends keyof GoalFormData>(
    key: K,
    value: GoalFormData[K]
  ) => void;
  addGoal: (data: GoalFormData) => void;
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

const GoalForm = ({ goalData, SetGoalData, addGoal }: GoalFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit: SubmitHandler<GoalFormData> = (data) => {
    addGoal(data);
  };
  console.log("errd", errors);

  return (
    <Container sx={{ pt: 3 }}>
      <Stack spacing={2}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <p>達成したいことを書きましょう（必須）</p>
          {/* TODO:smart分共通化（mapとかでいけそう？ */}
          <TextField
            label="purpose"
            {...register("goalData.purpose", {
              required: "必須です",
              minLength: { value: 3, message: "3文字以上入力してください" },
              maxLength: { value: 5, message: "5文字以内で入力してください" },
            })}
            value={goalData.purpose}
            onChange={(e) => SetGoalData("purpose", e.target.value)}
          />

          {errors.goalData?.purpose && (
            <span>{errors.goalData.purpose.message}</span>
          )}
          <p>それをSMARTに書きましょう（必須）</p>
          <TextField
            label="smartSpecific"
            {...register("goalData.smartSpecific", {
              required: "必須です",
              minLength: { value: 3, message: "3文字以上入力してください" },
              maxLength: { value: 5, message: "5文字以内で入力してください" },
            })}
            value={goalData.smartSpecific}
            onChange={(e) => SetGoalData("smartSpecific", e.target.value)}
          />
          {errors.goalData?.smartSpecific && (
            <span>{errors.goalData.smartSpecific.message}</span>
          )}
          <TextField
            label="smartMeasurable"
            {...register("goalData.smartSpecific", {
              required: "必須です",
              minLength: { value: 3, message: "3文字以上入力してください" },
              maxLength: { value: 5, message: "5文字以内で入力してください" },
            })}
            value={goalData.smartMeasurable}
            onChange={(e) => SetGoalData("smartMeasurable", e.target.value)}
          />
          {errors.goalData?.smartMeasurable && (
            <span>{errors.goalData.smartMeasurable.message}</span>
          )}
          <TextField
            label="smartAchievable"
            {...register("goalData.smartAchievable", {
              required: "必須です",
              minLength: { value: 3, message: "3文字以上入力してください" },
              maxLength: { value: 5, message: "5文字以内で入力してください" },
            })}
            value={goalData.smartAchievable}
            onChange={(e) => SetGoalData("smartAchievable", e.target.value)}
          />
          {errors.goalData?.smartAchievable && (
            <span>{errors.goalData.smartAchievable.message}</span>
          )}
          <TextField
            label="smartRelevant"
            {...register("goalData.smartRelevant", {
              required: "必須です",
              minLength: { value: 3, message: "3文字以上入力してください" },
              maxLength: { value: 5, message: "5文字以内で入力してください" },
            })}
            value={goalData.smartRelevant}
            onChange={(e) => SetGoalData("smartRelevant", e.target.value)}
          />
          {errors.goalData?.smartRelevant && (
            <span>{errors.goalData.smartRelevant.message}</span>
          )}
          <TextField
            label="smartTimeBound"
            {...register("goalData.smartTimeBound", {
              required: "必須です",
              minLength: { value: 3, message: "3文字以上入力してください" },
              maxLength: { value: 5, message: "5文字以内で入力してください" },
            })}
            value={goalData.smartTimeBound}
            onChange={(e) => SetGoalData("smartTimeBound", e.target.value)}
          />
          {errors.goalData?.smartTimeBound && (
            <span>{errors.goalData.smartTimeBound.message}</span>
          )}
          <p>やらないとどうなるかを書いてみましょう</p>
          <TextField
            label="loss"
            {...register("goalData.loss", {
              minLength: { value: 3, message: "3文字以上入力してください" },
              maxLength: { value: 5, message: "5文字以内で入力してください" },
            })}
            value={goalData.loss}
            onChange={(e) => SetGoalData("loss", e.target.value)}
          />
          {errors.goalData?.loss && <span>{errors.goalData.loss.message}</span>}
          <Button type="submit" variant="contained">
            追加
          </Button>
        </form>
      </Stack>
    </Container>
  );
};

export default GoalForm;
