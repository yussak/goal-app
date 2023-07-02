import { useEffect, useState } from "react";
import axios from "axios";
import Head from "next/head";
import GoalForm from "@/components/form/GoalForm";
import GoalList from "@/components/GoalList";
import { Goal } from "@/types";

export default function Home() {
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

  const deleteGoal = (id) => {
    axios
      .delete(process.env.NEXT_PUBLIC_API_URL + `/goal/${id}`)
      .then((res) => {
        getGoals();
      });
  };

  return (
    <>
      <Head>
        <title>Top page</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <h2>目標を追加する</h2>
        <GoalForm
          setTitle={setTitle}
          setText={setText}
          addGoal={addGoal}
          title={title}
          text={text}
        />
        <GoalList goals={goals} onDelete={deleteGoal} />
      </main>
    </>
  );
}
