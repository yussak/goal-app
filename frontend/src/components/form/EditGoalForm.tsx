import { GoalFormData, smartFields } from "@/types";
import { validationRules } from "@/utils/validationRules";
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
    handleSubmit,
    formState: { errors },
    control,
    setValue,
  } = useForm<GoalFormData>({
    defaultValues: {
      purpose: goalData.purpose,
      loss: goalData.loss,
      // smartS: goalData.smartS,..の分
      ...Object.fromEntries(
        smartFields.map((field) => [field, goalData[field]])
      ),
    },
  });
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

  const renderField = (name: keyof GoalFormData, label: string) => {
    return (
      <>
        {/* todo:goalformはcontrollerがない。なくても問題ないかを確認 */}
        <Controller
          name={name}
          control={control}
          rules={validationRules}
          render={({ field }) => (
            <TextField
              label={label}
              {...field}
              onChange={(e) => {
                field.onChange(e);
                SetGoalData(name, e.target.value);
              }}
            />
          )}
        />
        {errors[name] && (
          <span className="text-red">{errors[name]?.message}</span>
        )}
      </>
    );
  };

  return (
    <Container sx={{ pt: 3 }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={2}>
          {renderField("purpose", "purpose")}
          {renderField("loss", "loss")}
          {smartFields.map((smartField, index) => {
            return <div key={index}>{renderField(smartField, smartField)}</div>;
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
