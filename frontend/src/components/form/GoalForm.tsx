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
  } = useForm<GoalFormData>();

  const onSubmit: SubmitHandler<GoalFormData> = (data) => {
    addGoal(data);
  };
  // console.log("error is", errors);

  const smartFields: (
    | "smartSpecific"
    | "smartMeasurable"
    | "smartAchievable"
    | "smartRelevant"
    | "smartTimeBound"
  )[] = [
    "smartSpecific",
    "smartMeasurable",
    "smartAchievable",
    "smartRelevant",
    "smartTimeBound",
  ];

  return (
    <Container sx={{ pt: 3 }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <p>達成したいことを書きましょう（必須）</p>
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
          {errors.purpose && <span>{errors.purpose.message}</span>}
        </Stack>
        <p>それをSMARTに書きましょう（必須）</p>
        {smartFields.map((field, index) => {
          return (
            <div key={index}>
              <Stack spacing={2}>
                <TextField
                  label={field}
                  {...register(field, {
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
              </Stack>
              {errors[field] && <span>{errors[field]?.message}</span>}
            </div>
          );
        })}
        <p>やらないとどうなるかを書いてみましょう</p>
        <Stack spacing={2}>
          <TextField
            label="loss"
            {...register("loss", {
              minLength: { value: 3, message: "3文字以上入力してください" },
              maxLength: { value: 5, message: "5文字以内で入力してください" },
            })}
            value={goalData.loss}
            onChange={(e) => SetGoalData("loss", e.target.value)}
          />
          {errors.loss && <span>{errors.loss.message}</span>}
          <Button type="submit" variant="contained">
            追加
          </Button>
        </Stack>
      </form>
    </Container>
  );
};

export default GoalForm;
