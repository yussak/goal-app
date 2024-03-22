import Link from "next/link";
import { useSession } from "next-auth/react";
import { Button } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { CustomNextPage } from "@/types/custom-next-page";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { axios } from "@/utils/axios";
import { Report } from "@/types";

const ReportDetail: CustomNextPage = () => {
  const { data: session } = useSession();
  const { t } = useTranslation();
  const router = useRouter();
  const id = router.query.id;
  const [report, setreport] = useState<Report | null>(null);

  useEffect(() => {
    if (id) {
      getReportDetails(id as string);
    }
  }, [id]);

  const getReportDetails = async (reportId: string) => {
    try {
      const { data } = await axios.get(`/reports/${reportId}`);
      setreport(data);
    } catch (error) {
      console.error(error);
    }
  };
  console.log(report);

  return (
    <>
      {report ? (
        <>
          {/* todo:このページでも削除可能にしたい */}
          {/* <Button href={`/reports/edit/${report.id}`} startIcon={<EditIcon />}>
            {t("report_detail.button1")}
          </Button> */}
          <p>content: {report.content}</p>
          <p>reportDate: {report.reportDate.toString()}</p>
          {/* <p>userId(デバッグ用): {report.userId}</p> */}
          {/* <p>CreatedAt(デバッグ用): {report.CreatedAt.toString()}</p> */}
          {/* <p>UpdatedAt(デバッグ用): {report.UpdatedAt.toString()}</p> */}
          <Link href="/daily_reports">一覧に戻る</Link>
        </>
      ) : (
        <p>日報が見つかりません</p>
      )}
    </>
  );
};

export default ReportDetail;
ReportDetail.requireAuth = true;

export async function getServerSideProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
}
