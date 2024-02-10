import GoalForm from "@/components/form/GoalForm";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { CustomNextPage } from "@/types/custom-next-page";

const CreateGoal: CustomNextPage = () => {
  const { t } = useTranslation();

  return (
    <>
      <h2>{t("goal_create.title")}</h2>
      <GoalForm />
    </>
  );
};
export default CreateGoal;
CreateGoal.requireAuth = true;

// 値は入力によって変動せずあらかじめ用意されているテキストなのでSSG
export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
}
