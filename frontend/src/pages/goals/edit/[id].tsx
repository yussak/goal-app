import EditGoalForm from "@/components/form/EditGoalForm";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function EditGoal() {
  const router = useRouter();
  const id = router.query.id;

  const [title, setTitle] = useState<string>("");
  const [text, setText] = useState<string>("");

  useEffect(() => {
    if (router.isReady) {
      getGoal();
    }
  }, [router.isReady]);

  const getGoal = async () => {
    try {
      const { data } = await axios.get(
        process.env.NEXT_PUBLIC_API_URL + `/goals/${id}`
      );
      setTitle(data.title);
      setText(data.text);
    } catch (error) {
      console.error(error);
    }
  };

  const editGoal = async () => {
    try {
      const goal = {
        title: title,
        text: text,
      };
      await axios.put(
        process.env.NEXT_PUBLIC_API_URL + `/goals/edit/${id}`,
        goal
      );
      router.push(`/goals/${id}`);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <h2>目標編集</h2>

      <EditGoalForm
        setTitle={setTitle}
        setText={setText}
        editGoal={editGoal}
        title={title}
        text={text}
      />
    </>
  );
}
