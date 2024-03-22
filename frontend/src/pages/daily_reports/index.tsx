import { CustomNextPage } from "@/types/custom-next-page";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useSession } from "next-auth/react";
import { FieldErrors, SubmitHandler, useForm } from "react-hook-form";
import { Button, Stack, TextField } from "@mui/material";
import { validationRules } from "@/utils/validationRules";
import { axios } from "@/utils/axios";
import { useEffect, useState } from "react";
import { Report } from "@/types";

const DailyReports: CustomNextPage = () => {
  const { t } = useTranslation();
  const { data: session } = useSession();
  const userId = session?.user ? session.user.id : null;
  const [reports, setReports] = useState<Report[] | null>(null);

  type FormData = {
    content: string;
  };

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isValid },
  } = useForm<FormData>({ mode: "onChange" });

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      const res = await axios.get(`/reports/${userId}`);
      setReports(res.data);
    } catch (err: any) {
      // この条件がないと毎回「undefined」エラーが出てしまう
      if (err?.response) {
        console.error(err?.response?.data?.error);
      }
    }
  };

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    await addReport(data);
  };

  const addReport = async (data: FormData) => {
    try {
      await axios.post("/report", { ...data, userId });
    } catch (err: any) {
      setError("content", {
        type: "manual",
        message: err.response.data.error,
      });
      console.error("err: ", err.response.data.error);
    }
  };

  // todo:rende…r廃止
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
      {/* todo:すでにその日に追加されているならそれ以上追加できなくする（一日１件だけ追加可能にする）→できた */}
      {/* todo:バリデーション追加 */}
      {/* todo:バリデーションに沿ってボタン制御する */}
      {/* todo:エラーメッセージを表示する */}
      {/* todo:フォームを広くする */}
      {/* todo: tで書き換え */}
      <h2>日報一覧</h2>
      {/* todo:textareaに変える */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="content">その日学んだことなどを書いてみましょう</label>
        {renderTextField("content", register, validationRules, errors)}
        <Button type="submit" variant="contained" disabled={!isValid}>
          追加
        </Button>
      </form>
      <ul>
        {reports &&
          reports.map((report, index) => {
            return <li key={index}>{report.content}</li>;
          })}
      </ul>
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
