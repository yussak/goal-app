import { useEffect, useState } from "react";
import axios from "axios";
import GoalForm from "@/components/form/GoalForm";
import GoalList from "@/components/GoalList";
import { Goal, User } from "@/types";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import cookie from "cookie";
import { NextPageContext } from "next";
import { useUser } from "@/contexts/userContext";

export default function GoalIndex({
  user: currentUser,
}: {
  user: User | null;
}) {
  const { t } = useTranslation();
  const [goals, setGoals] = useState<Goal[]>([]);

  const [title, setTitle] = useState<string>("");
  const [text, setText] = useState<string>("");
  const { login } = useUser();

  useEffect(() => {
    getGoals();
  }, []);

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

export async function getServerSideProps(context: NextPageContext) {
  // export async function getServerSideProps(context) {
  const cookies = cookie.parse(
    context.req ? context.req.headers.cookie || "" : document.cookie
  );
  const token = cookies.token;
  // console.log("token is", token);
  // Tokenが存在しない場合はユーザー情報を空にする
  if (!token) {
    return { props: { user: null } };
  }
  try {
    const res = await axios.post(
      "http://backend:8080/auth/decodeToken",
      {},
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return { props: { user: res.data.user || null } };
  } catch (error) {
    console.error("error: ", error);
    return { props: {} };
  }
}

// TODO:型直す
// TODO:いったんコメントアウト
// export async function getServerSideProps({ locale }: any) {
//   return {
//     props: {
//       ...(await serverSideTranslations(locale, ["common"])),
//       // Will be passed to the page component as props
//     },
//   };
// }
