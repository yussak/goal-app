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
      // TODO:うまく書き換え
      smartS: goalData.smartS,
      smartM: goalData.smartM,
      smartA: goalData.smartA,
      smartR: goalData.smartR,
      smartT: goalData.smartT,
    },
  });
  console.log("sd", goalData);
  const onSubmit: SubmitHandler<GoalFormData> = (data) => {
    editGoal(data);
  };

  useEffect(() => {
    setValue("purpose", goalData.purpose);
    setValue("loss", goalData.loss);
    smartFields.forEach((field) => {
      setValue(field, goalData[field]);
    });
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
          {smartFields.map((smartField, index) => {
            return (
              <div key={index}>
                <Stack spacing={2}>
                  <Controller
                    name={smartField}
                    control={control}
                    rules={{
                      required: "必須です",
                      minLength: {
                        value: 3,
                        message: "3文字以上入力してください",
                      },
                      maxLength: {
                        value: 5,
                        message: "5文字以内で入力してください",
                      },
                    }}
                    render={({ field }) => (
                      <TextField
                        label={smartField}
                        {...field}
                        value={goalData[smartField]}
                        onChange={(e) =>
                          SetGoalData(smartField, e.target.value)
                        }
                      />
                    )}
                  />
                </Stack>
                {errors[smartField] && (
                  <span className="text-red">
                    {errors[smartField]?.message}
                  </span>
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
