import { useRef, useState } from "react";
import GoalForm from "@/components/form/GoalForm";
import GoalList from "@/components/GoalList";
import { useTranslation } from "next-i18next";
import useSWR, { mutate } from "swr";
import { axios } from "@/utils/axios";
import { fetcher } from "@/utils/fetcher";
import { useSession } from "next-auth/react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export default function Goals() {
  const { t } = useTranslation();

  const [title, setTitle] = useState<string>("");
  const [text, setText] = useState<string>("");
  const [smart_specific, SetSmartSpecific] = useState<string>("");
  const [smart_measurable, SetSmartMeasurable] = useState<string>("");
  const [smart_achievable, SetSmartAchievable] = useState<string>("");
  const [smart_relevant, SetSmartRelevant] = useState<string>("");
  const [smart_time_bound, SetSmartTimeBound] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);
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
    if (file !== null) {
      formData.append("image", file);
    }
    formData.append("title", title);
    formData.append("text", text);
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
      setTitle("");
      setText("");
      // これがないとフォームはリセットできてても前のgoalの画像が次のgoalにも表示されてしまう;
      setFile(null);
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
            setTitle={setTitle}
            setText={setText}
            SetSmartSpecific={SetSmartSpecific}
            SetSmartMeasurable={SetSmartMeasurable}
            SetSmartAchievable={SetSmartAchievable}
            SetSmartRelevant={SetSmartRelevant}
            SetSmartTimeBound={SetSmartTimeBound}
            setFile={setFile}
            addGoal={addGoal}
            title={title}
            text={text}
            smartSpecific={smartSpecific}
            smartMeasurable={smartMeasurable}
            smartAchievable={smartAchievable}
            smartRelevant={smartRelevant}
            smartTimeBound={smartTimeBound}
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
