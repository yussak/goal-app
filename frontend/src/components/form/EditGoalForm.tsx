import { GoalFormData, smartFields } from "@/types";
import { Button, Container, Stack, TextField } from "@mui/material";
import { useEffect } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";

type EditGoalFormProps = {
  SetGoalData: <K extends keyof GoalFormData>(
    key: K,
    value: GoalFormData[K]
  ) => void;
  editGoal: (data: GoalFormData) => void;
  goalData: GoalFormData;
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
    control,
    setValue,
  } = useForm<GoalFormData>({
    defaultValues: {
      purpose: goalData.purpose,
      loss: goalData.loss,
    },
  });
  console.log("sd", goalData);
  const onSubmit: SubmitHandler<GoalFormData> = (data) => {
    editGoal(data);
  };

  useEffect(() => {
    setValue("purpose", goalData.purpose);
    setValue("loss", goalData.loss);
  }, [control, goalData]);
  // }, [control, goalData.purpose]);

  return (
    <Container sx={{ pt: 3 }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={2}>
          <Controller
            name="purpose"
            control={control}
            // TODO:共通化(以下参考)
            // https://zenn.dev/longbridge/articles/640710005e11b1
            rules={{
              required: "必須です",
              minLength: { value: 3, message: "3文字以上入力してください" },
              maxLength: { value: 5, message: "5文字以内で入力してください" },
            }}
            render={({ field }) => (
              <TextField
                label="purpose"
                {...field}
                onChange={(e) => {
                  field.onChange(e);
                  SetGoalData("purpose", e.target.value);
                }}
              />
            )}
          />
          {errors.purpose && (
            <span className="text-red">{errors.purpose.message}</span>
          )}
          <Controller
            name="loss"
            control={control}
            rules={{
              required: "必須です",
              minLength: { value: 3, message: "3文字以上入力してください" },
              maxLength: { value: 5, message: "5文字以内で入力してください" },
            }}
            render={({ field }) => (
              <TextField
                label="loss"
                {...field}
                onChange={(e) => {
                  field.onChange(e);
                  SetGoalData("loss", e.target.value);
                }}
              />
            )}
          />
          {errors.loss && (
            <span className="text-red">{errors.loss.message}</span>
          )}
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
                {errors[field] && (
                  <span className="text-red">{errors[field]?.message}</span>
                )}
              </div>
            );
          })}
          <Button type="submit" variant="contained">
            更新
          </Button>
        </Stack>
      </form>
    </Container>
  );
};

export default EditGoalForm;
