import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { axios } from "@/utils/axios";
import { Goal, GoalComment } from "@/types";
import GoalCommentForm from "@/components/form/GoalCommentForm";
import GoalCommentList from "@/components/GoalCommentList";
import Link from "next/link";
import { useSession } from "next-auth/react";

export default function GoalDetail() {
  const [goal, setGoal] = useState<Goal | null>(null);
  const [comments, setComments] = useState<GoalComment[]>([]);

  const [title, setTitle] = useState<string>("");
  const [text, setText] = useState<string>("");

  const { data: session } = useSession();

  const router = useRouter();
  const id = router.query.id;

  useEffect(() => {
    if (router.isReady) {
      getGoalDetails();
      getComments();
    }
  }, [router.isReady]);

  const getGoalDetails = async () => {
    try {
      const { data } = await axios.get(`/goals/${id}`);
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
      await axios.post(`/goals/${id}/comments`, comment);
      await getComments();
      setTitle("");
      setText("");
    } catch (error) {
      console.error(error);
    }
  };

  const getComments = async () => {
    try {
      const { data } = await axios.get(`/goals/${id}/comments`);
      setComments(data);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteComment = async (comment_id: string) => {
    try {
      await axios.delete(`/goals/${id}/comments/${comment_id}`);
      await getComments();
    } catch (error) {
      console.error(error);
    }
  };

  const isMyGoal =
    goal && session?.user ? goal.user_id === session?.user?.id : false;

  return (
    <>
      <h2>目標詳細</h2>
      {goal && (
        <>
          {isMyGoal ? (
            <>
              <Link href={`/goals/edit/${goal.id}`}>edit</Link>
              <p>this is my goal（デバッグ用）</p>
            </>
          ) : (
            "not my goal（デバッグ用）"
          )}
          <p>specific: {goal.smartS}</p>
          <p>measurable: {goal.smartM}</p>
          <p>achievable: {goal.smartA}</p>
          <p>relevant: {goal.smartR}</p>
          <p>time_bound: {goal.smartT}</p>
          <p>purpose: {goal.purpose}</p>
          <p>loss: {goal.loss}</p>
          <p>progress: {goal.progress}</p>
          <p>user_id(デバッグ用): {goal.user_id}</p>
          <p>CreatedAt(デバッグ用): {goal.CreatedAt.toString()}</p>
          <p>UpdatedAt(デバッグ用): {goal.UpdatedAt.toString()}</p>
        </>
      )}
      {session?.user && (
        <>
          <h3>コメントを追加</h3>
          <GoalCommentForm
            setTitle={setTitle}
            setText={setText}
            addComment={addComment}
            title={title}
            text={text}
          />
        </>
      )}
      <h3>コメント一覧</h3>
      <GoalCommentList comments={comments} onDelete={deleteComment} />
    </>
  );
}
