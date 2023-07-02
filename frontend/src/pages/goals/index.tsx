import { useEffect, useState } from "react";
import axios from "axios";
import GoalForm from "@/components/form/GoalForm";
import GoalList from "@/components/GoalList";
import { Goal } from "@/types";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export default function GoalIndex() {
  const { t, i18n } = useTranslation();
  const [goals, setGoals] = useState<Goal[]>([]);

  const [title, setTitle] = useState<string>("");
  const [text, setText] = useState<string>("");

  useEffect(() => {
    getGoals();
  }, []);

  const addGoal = () => {
    const goal = {
      title: title,
      text: text,
    };
    const body = new URLSearchParams(goal);

    axios.post(process.env.NEXT_PUBLIC_API_URL + "/goal", body).then((res) => {
      getGoals();
      setTitle("");
      setText("");
    });
  };

  // thenを使う場合はasync/awaitは不要ということ（理解できてないので調べる）
  // try-catchだとasync awaitはいるのか。どちらにすべきか確認する
  const getGoals = () => {
    axios
      .get(process.env.NEXT_PUBLIC_API_URL + "/goals")
      .then(({ data }) => {
        setGoals(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteGoal = (id: string) => {
    axios
      .delete(process.env.NEXT_PUBLIC_API_URL + `/goal/${id}`)
      .then((res) => {
        getGoals();
      });
  };

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <>
      <div>
        <h2>目標を追加する</h2>
        <p>{t("test")}</p>
        {/* TODO:コンポーネントに切り出す（ヘッダーが良さそう） */}
        <button onClick={() => changeLanguage("en")}>{t("english")}</button>
        <button onClick={() => changeLanguage("ja")}>{t("japanese")}</button>
        <GoalForm
          setTitle={setTitle}
          setText={setText}
          addGoal={addGoal}
          title={title}
          text={text}
        />
        <GoalList goals={goals} onDelete={deleteGoal} />
      </div>
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
