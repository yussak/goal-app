import { CustomNextPage } from "@/types/custom-next-page";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useSession } from "next-auth/react";
import { FieldErrors, SubmitHandler, useForm } from "react-hook-form";
import { Button, Stack, TextField } from "@mui/material";
import { validationRules } from "@/utils/validationRules";
import { axios } from "@/utils/axios";

const DailyReports: CustomNextPage = () => {
  const { t } = useTranslation();
  const { data: session } = useSession();
  const userId = session?.user ? session.user.id : null;

  type FormData = {
    content: string;
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormData>({ mode: "onChange" });

  const onSubmit: SubmitHandler<FormData> = (data) => {
    console.log("submit", { ...data, userId });
    axios.post("/report", { ...data, userId });
  };

  const renderTextField = (
    name: string,
    // todo:anyじゃなくしたい
    register: any,
    validationRules: any,
    errors: FieldErrors
  ) => {
    return (
      <Stack spacing={2}>
        <TextField
          label={name}
          id={name}
          {...register(name, validationRules)}
          error={!!errors[name]}
          helperText={errors[name]?.message}
          data-testid={`error-${name}`}
        />
      </Stack>
    );
  };

  return (
    <div>
      {/* todo:追加処理実装→とりあえず保存はできた */}
      {/* todo:すでにその日に追加されているならそれ以上追加できなくする（一日１件だけ追加可能にする） */}
      {/* todo:バリデーション追加 */}
      {/* todo:バリデーションに沿ってボタン制御する */}
      {/* todo:エラーメッセージを表示する */}
      {/* todo:フォームを広くする */}
      {/* todo: tで書き換え */}
      <h2>日報一覧</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="content">その日学んだことなどを書いてみましょう</label>
        {renderTextField("content", register, validationRules, errors)}
        <Button type="submit" variant="contained" disabled={!isValid}>
          追加
        </Button>
      </form>
    </div>
  );
};

export default DailyReports;
DailyReports.requireAuth = true;

export async function getServerSideProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
}
