import { useEffect, useState } from "react";
import axios from "axios";
import GoalForm from "@/components/form/GoalForm";
import GoalList from "@/components/GoalList";
import { Goal, User } from "@/types";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { NextPageContext } from "next";
import { useUser } from "@/contexts/userContext";
import { checkAuth } from "@/utils/auth";
import useSWR, { mutate } from "swr";
import { fetcher } from "@/utils/fetcher";

export default function GoalIndex({
  // TODO:useLoginいらないのか確認（currentUserを取得するだけなら必須ではなさそう？
  user: currentUser,
}: {
  user: User | null;
}) {
  const { t } = useTranslation();

  const [title, setTitle] = useState<string>("");
  const [text, setText] = useState<string>("");
  const { login } = useUser();

  const { data: goals, error } = useSWR(
    process.env.NEXT_PUBLIC_API_URL + "/goals",
    fetcher
  );
  if (error) {
    console.error(error);
  }

  // useEffectは複数書ける
  useEffect(() => {
    if (currentUser) {
      login(currentUser);
    }
  }, [currentUser]);
  // console.log(currentUser.id);

  const addGoal = async () => {
    const goal = {
      title: title,
      text: text,
      // TODO:非ログイン時送信できないようにすればnullチェック不要そう？
      user_id: currentUser ? currentUser.id : null,
    };

    try {
      // TODO:useSWRMutationで書き換えられそう？調べる
      await axios.post(process.env.NEXT_PUBLIC_API_URL + "/goal", goal);
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

export async function getServerSideProps(context: NextPageContext) {
  const user = await checkAuth(context);
  const { locale } = context;

  return {
    props: {
      user,
      ...(await serverSideTranslations(locale!, ["common"])),
    },
  };
}
