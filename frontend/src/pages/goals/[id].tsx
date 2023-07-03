import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { Goal } from "@/types";
import GoalCommentForm from "@/components/form/GoalCommentForm";

export default function GoalDetail() {
  const [goal, setGoal] = useState<Goal | null>(null);

  const [title, setTitle] = useState<string>("");
  const [text, setText] = useState<string>("");

  const router = useRouter();
  const id = router.query.id;

  useEffect(() => {
    if (!router.isReady) return;
    axios
      .get(process.env.NEXT_PUBLIC_API_URL + `/goals/${id}`)
      .then(({ data }) => {
        setGoal(data);
      });
  }, [router.isReady]);

  const addComment = () => {
    const comment = {
      goal_id: id,
      title: title,
      text: text,
    };
    const body = new URLSearchParams(comment);

    axios
      .post(process.env.NEXT_PUBLIC_API_URL + "/goal_comment", body)
      .then((res) => {
        setTitle("");
        setText("");
      });
  };

  return (
    <>
      <div>
        <h2>目標詳細</h2>
        {goal && (
          <>
            <p>{goal.title}</p>
            <p>{goal.text}</p>
          </>
        )}
        <GoalCommentForm
          setTitle={setTitle}
          setText={setText}
          addComment={addComment}
          title={title}
          text={text}
        />
      </div>
    </>
  );
}
