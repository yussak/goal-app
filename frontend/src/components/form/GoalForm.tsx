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
          <p>やらないとどうなるかを書いてみましょう</p>
          <TextField
            label="loss"
            value={goalData.loss}
            onChange={(e) => SetGoalData("loss", e.target.value)}
          />
          <Button type="submit" variant="contained">
            {/* <Button onClick={addGoal} variant="contained"> */}
            追加
          </Button>
        </form>
      </Stack>
    </Container>
  );
};

export default GoalForm;
