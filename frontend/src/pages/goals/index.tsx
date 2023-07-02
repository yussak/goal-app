import { useEffect, useState } from "react";
import axios from "axios";
import GoalForm from "@/components/form/GoalForm";
import GoalList from "@/components/GoalList";
import { Goal } from "@/types";

export default function GoalIndex() {
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

  return (
    <>
      <div>
        <h2>目標を追加する</h2>
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
