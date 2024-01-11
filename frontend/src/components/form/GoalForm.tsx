import { GoalFormData } from "@/types/GoalForm";
import { validationRules } from "@/utils/validationRules";
import { Button, Container, Stack, TextField } from "@mui/material";
import { FieldErrors, SubmitHandler, useForm } from "react-hook-form";

type GoalFormProps = {
  addGoal: (data: GoalFormData) => void;
};

const GoalForm = ({ addGoal }: GoalFormProps) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<GoalFormData>();

  const onSubmit: SubmitHandler<GoalFormData> = (data) => {
    addGoal(data);
  };

  // 値が空の時はdisabledにする
  const purpose = watch("purpose");
  const content = watch("content");
  const loss = watch("loss");
  const isAnyFieldEmpty = !purpose || !content || !loss;

  const renderTextField = (
    name: string,
    // todo:anyじゃなくしたい
    register: any,
    errors: FieldErrors
  ) => {
    return (
      <Stack spacing={2}>
        <TextField
          label={name}
          {...register(name, validationRules)}
          error={!!errors[name]}
          helperText={errors[name]?.message}
          data-testid={`error-${name}`}
        />
      </Stack>
    );
  };

  return (
    <Container sx={{ pt: 3 }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <p>達成したいことを書きましょう（必須）</p>
        {renderTextField("purpose", register, errors)}
        <p>それをSMARTに書きましょう（必須）</p>
        {renderTextField("content", register, errors)}
        <p>やらないとどうなるかを書いてみましょう</p>
        {renderTextField("loss", register, errors)}
        <Button type="submit" variant="contained" disabled={isAnyFieldEmpty}>
          追加
        </Button>
      </form>
    </Container>
  );
};

export default GoalForm;
