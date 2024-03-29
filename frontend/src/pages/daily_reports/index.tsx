import { CustomNextPage } from "@/types/custom-next-page";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useSession } from "next-auth/react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Button, Stack, TextField } from "@mui/material";
import { validationRules } from "@/utils/validationRules";
import { axios } from "@/utils/axios";
import { useEffect, useState } from "react";
import { Report } from "@/types";
import Link from "next/link";

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
    reset,
    formState: { errors, isValid },
  } = useForm<FormData>({ mode: "onChange" });

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      const res = await axios.get(`/users/${userId}/reports`);
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
      await axios.post("/reports", { ...data, userId });
      await fetchReports();
      reset();
    } catch (err: any) {
      setError("content", {
        type: "manual",
        message: err.response.data.error,
      });
      console.error("err: ", err.response.data.error);
    }
  };

  const handleDelete = async (reportId: string) => {
    try {
      await axios.delete(`/reports/${reportId}`);
      await fetchReports();
    } catch (err: any) {
      console.error(err.response.data.error);
    }
  };

  return (
    <div>
      {/* todo:すでにレポート投稿住みならページ表示時点でボタン押せなくする */}
      {/* todo:フォームを広くする */}
      {/* todo: tで書き換え */}
      <h2>日報一覧</h2>
      {/* todo:textareaに変える */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={2}>
          <label htmlFor="content">今日学んだことなどを書いてみましょう</label>
          <TextField
            label="content"
            id="content"
            {...register("content", validationRules)}
            error={!!errors.content}
            helperText={errors.content?.message}
            data-testid="error-content"
          />
          <Button type="submit" variant="contained" disabled={!isValid}>
            追加
          </Button>
        </Stack>
      </form>
      <ul>
        {reports &&
          reports.map((report, index) => {
            return (
              <li key={index}>
                <Link href={`/daily_reports/${report.id}`}>
                  {report.content}
                </Link>
                {/* todo:年月日のみに変える（今時間も入ってる） */}
                {report.reportDate.toString()}
                {session?.user?.id === report.userId && (
                  <span>
                    <button onClick={() => handleDelete(report.id)}>
                      削除
                    </button>
                  </span>
                )}
              </li>
            );
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
