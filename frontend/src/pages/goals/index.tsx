import { useRef, useState } from "react";
import GoalForm from "@/components/form/GoalForm";
import GoalList from "@/components/GoalList";
import { useTranslation } from "next-i18next";
import useSWR, { mutate } from "swr";
import { axios } from "@/utils/axios";
import { fetcher } from "@/utils/fetcher";
import { useSession } from "next-auth/react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { GoalFormData } from "@/types";

export default function Goals() {
  const { t } = useTranslation();

  const [goalData, SetGoalData] = useState<GoalFormData>({
    purpose: "",
    loss: "",
    Specific: "",
    Measurable: "",
    Achievable: "",
    Relevant: "",
    TimeBound: "",
    file: null,
    imageURL: null,
  });

  const handleSetGoalData = <K extends keyof GoalFormData>(
    key: K,
    value: GoalFormData[K]
  ) => {
    SetGoalData((prev) => ({ ...prev, [key]: value }));
  };

  const { data: session } = useSession();

  const user_id = session?.user ? session.user.id : null;

  const { data: goals, error } = useSWR(`/${user_id}/goals`, fetcher);
  if (error) {
    console.error(error);
  }
  // ファイルリセット
  const inputRef = useRef<HTMLInputElement>(null);

  const addGoal = async () => {
    const formData = new FormData();
    if (goalData.file !== null) {
      formData.append("image", goalData.file);
    }
    formData.append("purpose", goalData.purpose);
    formData.append("loss", goalData.loss);
    formData.append("Specific", goalData.Specific);
    formData.append("Measurable", goalData.Measurable);
    formData.append("Achievable", goalData.Achievable);
    formData.append("Relevant", goalData.Relevant);
    formData.append("TimeBound", goalData.TimeBound);
    if (session?.user) {
      formData.append("user_id", session?.user.id);
    }
    try {
      // TODO:useSWRMutationで書き換えられそう？調べる
      await axios.post("/goal", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      // useSWRで書き換える
      mutate(`/${user_id}/goals`);
      // TODO:フォームリセットしたい→地味に今までと違うやり方必要そうなので調べる
      // setTitle("");
      // setText("");
      // これがないとフォームはリセットできてても前のgoalの画像が次のgoalにも表示されてしまう;
      // setFile(null);
      // fileのリセット
      if (inputRef.current) {
        inputRef.current.value = "";
      }
    } catch (error) {
      console.error(error);
    }
  };

  const deleteGoal = async (id: string) => {
    try {
      await axios.delete(`/goal/${id}`);
      mutate(`/${user_id}/goals`);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <h2>{t("goal_index.title")}</h2>
      {session?.user && (
        <>
          debug用 id: {session?.user.id}
          <GoalForm
            SetGoalData={handleSetGoalData}
            goalData={goalData}
            addGoal={addGoal}
            inputRef={inputRef}
          />
        </>
      )}
      <GoalList goals={goals} onDelete={deleteGoal} />
    </>
  );
}

export async function getServerSideProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
}
