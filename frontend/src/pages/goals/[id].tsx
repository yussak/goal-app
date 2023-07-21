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
    getGoalDetails();
    getComments();
  }, [router.isReady]);

  const getGoalDetails = async () => {
    try {
      const { data } = await axios.get(
        process.env.NEXT_PUBLIC_API_URL + `/goals/${id}`
      );
      setGoal(data);
    } catch (error) {
      console.error(error);
    }
  };

  const addComment = async () => {
    const comment = {
      goal_id: id,
      title: title,
      text: text,
    };
    try {
      await axios.post(
        process.env.NEXT_PUBLIC_API_URL + `/goals/${id}/comments`,
        comment
      );
      await getComments();
      setTitle("");
      setText("");
    } catch (error) {
      console.error(error);
    }
  };

  const getComments = async () => {
    try {
      const { data } = await axios.get(
        process.env.NEXT_PUBLIC_API_URL + `/goals/${id}/comments`
      );
      setComments(data);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteComment = async (comment_id: string) => {
    try {
      await axios.delete(
        process.env.NEXT_PUBLIC_API_URL + `/goals/${id}/comments/${comment_id}`
      );
      await getComments();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <h2>目標詳細</h2>
      {goal && (
        <>
          <p>title: {goal.title}</p>
          <p>text: {goal.text}</p>
        </>
      )}
      <GoalCommentForm
        setTitle={setTitle}
        setText={setText}
        addComment={addComment}
        title={title}
        text={text}
      />
      <h3>コメント一覧</h3>
      <GoalCommentList comments={comments} onDelete={deleteComment} />
    </>
  );
}
