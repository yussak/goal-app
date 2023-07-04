import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { Goal, GoalComment } from "@/types";
import GoalCommentForm from "@/components/form/GoalCommentForm";
import GoalCommentList from "@/components/GoalCommentList";

export default function GoalDetail() {
  const [goal, setGoal] = useState<Goal | null>(null);
  const [comments, setComments] = useState<GoalComment[]>([]);

  const [title, setTitle] = useState<string>("");
  const [text, setText] = useState<string>("");

  const router = useRouter();
  const id = router.query.id;

  useEffect(() => {
    if (!router.isReady) return;
    // TODO: getGoal的なのに切り出す
    axios
      .get(process.env.NEXT_PUBLIC_API_URL + `/goals/${id}`)
      .then(({ data }) => {
        setGoal(data);
      });
    getComments();
  }, [router.isReady]);

  const addComment = () => {
    const comment = {
      goal_id: id,
      title: title,
      text: text,
    };
    // const body = new URLSearchParams(comment);

    axios
      .post(process.env.NEXT_PUBLIC_API_URL + `/goals/${id}/comments`, comment)
      .then((res) => {
        getComments();
        setTitle("");
        setText("");
      });
  };

  const getComments = () => {
    axios
      .get(process.env.NEXT_PUBLIC_API_URL + `/goals/${id}/comments`)
      .then(({ data }) => {
        setComments(data);
      })
      .catch((err) => {
        console.log(err);
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
        <GoalCommentList comments={comments} />
      </div>
    </>
  );
}
