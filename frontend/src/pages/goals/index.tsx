import { useEffect, useState } from "react";
import axios from "axios";
import GoalForm from "@/components/form/GoalForm";
import GoalList from "@/components/GoalList";
import { Goal } from "@/types";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export default function GoalIndex() {
  const { t } = useTranslation();
  const [goals, setGoals] = useState<Goal[]>([]);

  const [title, setTitle] = useState<string>("");
  const [text, setText] = useState<string>("");

  useEffect(() => {
    getGoals();
  }, []);

  const addGoal = async () => {
    const goal = {
      title: title,
      text: text,
    };

    try {
      await axios.post(process.env.NEXT_PUBLIC_API_URL + "/goal", goal);
      await getGoals();
      setTitle("");
      setText("");
    } catch (error) {
      console.error(error);
    }
  };

  const getGoals = async () => {
    try {
      const { data } = await axios.get(
        process.env.NEXT_PUBLIC_API_URL + "/goals"
      );
      setGoals(data);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteGoal = async (id: string) => {
    try {
      await axios.delete(process.env.NEXT_PUBLIC_API_URL + `/goal/${id}`);
      await getGoals();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <h2>{t("goal_index.title")}</h2>

      <GoalForm
        setTitle={setTitle}
        setText={setText}
        addGoal={addGoal}
        title={title}
        text={text}
      />
      <GoalList goals={goals} onDelete={deleteGoal} />
    </>
  );
}

export async function getServerSideProps({ locale }: any) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
      // Will be passed to the page component as props
    },
  };
}
