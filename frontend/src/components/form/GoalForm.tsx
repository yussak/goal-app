import { GoalFormData } from "@/types/GoalForm";
import { validationRules } from "@/utils/validationRules";
import { Button, Container, Stack, TextField } from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";

type GoalFormProps = {
  SetGoalData: <K extends keyof GoalFormData>(
    key: K,
    value: GoalFormData[K]
  ) => void;
  addGoal: (data: GoalFormData) => void;
  goalData: GoalFormData;
};

const GoalForm = ({ goalData, SetGoalData, addGoal }: GoalFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors = {} },
    // formState: { errors },
  } = useForm<GoalFormData>();

  const onSubmit: SubmitHandler<GoalFormData> = (data) => {
    addGoal(data);
  };

  // フォームに空欄が1つでもあるかどうか
  const isAnyFieldEmpty =
    !goalData.purpose || !goalData.content || !goalData.loss;

  const renderTextField = (
    label: string,
    // todo:anyじゃなくしたい
    register: any,
    value: string,
    SetGoalData: any,
    errors: any
  ) => {
    return (
      <Stack spacing={2}>
        <TextField
          label={label}
          {...register(label, validationRules)}
          value={value}
          onChange={(e) => SetGoalData(label, e.target.value)}
        />
        {errors[label] && (
          // テストで使用するためdata-testidをつける
          <span data-testid={`error-${label}`} className="text-red">
            {errors[label]?.message}
          </span>
        )}
      </Stack>
    );
  };

  return (
    <Container sx={{ pt: 3 }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <p>達成したいことを書きましょう（必須）</p>
        {renderTextField(
          "purpose",
          register,
          goalData.purpose,
          SetGoalData,
          errors
        )}
        <p>それをSMARTに書きましょう（必須）</p>
        {renderTextField(
          "content",
          register,
          goalData.content,
          SetGoalData,
          errors
        )}
        <p>やらないとどうなるかを書いてみましょう</p>
        {renderTextField("loss", register, goalData.loss, SetGoalData, errors)}
        <Button type="submit" variant="contained" disabled={isAnyFieldEmpty}>
          追加
        </Button>
      </form>
    </Container>
  );
};

export default GoalForm;
