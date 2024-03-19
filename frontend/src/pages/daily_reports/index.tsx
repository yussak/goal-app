import { CustomNextPage } from "@/types/custom-next-page";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useSession } from "next-auth/react";

const TAB_PHASE_LIST = ["all", "plan", "wip", "done"];

const DailyReports: CustomNextPage = () => {
  const { t } = useTranslation();
  const { data: session } = useSession();
  const userId = session?.user ? session.user.id : null;

  return (
    <div>
      <h2>日報一覧</h2>
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
