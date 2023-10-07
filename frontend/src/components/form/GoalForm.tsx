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

  const smartFields = [
    "smartSpecific",
    "smartMeasurable",
    "smartAchievable",
    "smartRelevant",
    "smartTimeBound",
  ];

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
          {smartFields.map((field) => {
            return (
              <>
                <TextField
                  label={field}
                  {...register(`goalData.${field}`, {
                    required: "必須です",
                    minLength: {
                      value: 3,
                      message: "3文字以上入力してください",
                    },
                    maxLength: {
                      value: 5,
                      message: "5文字以内で入力してください",
                    },
                  })}
                  value={goalData[field]}
                  onChange={(e) => SetGoalData(field, e.target.value)}
                />
                {errors.goalData && errors.goalData[field] && (
                  <span>{errors.goalData[field].message}</span>
                )}
              </>
            );
          })}
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
