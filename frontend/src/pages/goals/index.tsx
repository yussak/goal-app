import { useState } from "react";
import axios from "axios";
import GoalForm from "@/components/form/GoalForm";
import GoalList from "@/components/GoalList";
import { useTranslation } from "next-i18next";
import useSWR, { mutate } from "swr";
import { fetcher } from "@/utils/fetcher";
import { useSession } from "next-auth/react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export default function Goals() {
  const { t } = useTranslation();

  const [title, setTitle] = useState<string>("");
  const [text, setText] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);
  const { data: session } = useSession();

  const { data: goals, error } = useSWR("/goals", fetcher);
  if (error) {
    console.error(error);
  }

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
      await axios.post(process.env.NEXT_PUBLIC_API_URL + "/goal", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      // useSWRで書き換える
      mutate(process.env.NEXT_PUBLIC_API_URL + "/goals");
      setTitle("");
      setText("");
    } catch (error) {
      console.error(error);
    }
  };

  const deleteGoal = async (id: string) => {
    try {
      await axios.delete(process.env.NEXT_PUBLIC_API_URL + `/goal/${id}`);
      mutate(process.env.NEXT_PUBLIC_API_URL + "/goals");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <h2>{t("goal_index.title")}</h2>
      {session?.user && (
        <GoalForm
          setTitle={setTitle}
          setText={setText}
          setFile={setFile}
          addGoal={addGoal}
          title={title}
          text={text}
        />
      )}
      <GoalList goals={goals} onDelete={deleteGoal} />
    </>
  );
}

export async function getServerSideProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
}
