import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { axios } from "@/utils/axios";
import { Goal, Milestone } from "@/types";
import MilestoneForm from "@/components/form/MilestoneForm";
import MilestoneList from "@/components/MilestoneList";
import Link from "next/link";
import { useSession } from "next-auth/react";

export default function GoalDetail() {
  const [goal, setGoal] = useState<Goal | null>(null);

  const [milestones, setMilestones] = useState<Milestone[]>([]);
  const [milestoneContent, setMilestoneContent] = useState<string>("");

  const { data: session } = useSession();

  const router = useRouter();
  const id = router.query.id;

  useEffect(() => {
    if (router.isReady) {
      getGoalDetails();
      getMilestones();
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

  const addMilestone = async () => {
    const params = {
      goal_id: id,
      content: milestoneContent,
      user_id: session?.user?.id,
    };
    try {
      const res = await axios.post(`/goals/${id}/milestones`, params);
      await getMilestones();
      setMilestoneContent("");
    } catch (error) {
      console.error(error);
    }
  };

  const getMilestones = async () => {
    try {
      const { data } = await axios.get(`/goals/${id}/milestones`);
      setMilestones(data);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteMilestone = async (comment_id: string) => {
    try {
      await axios.delete(`/goals/${id}/milestones/${comment_id}`);
      await getMilestones();
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
          <p>content: {goal.content}</p>
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
          {/* TODO:コメント周りのコード消す */}
          <h3>中目標を追加</h3>
          <MilestoneForm
            setContent={setMilestoneContent}
            addMilestone={addMilestone}
            content={milestoneContent}
          />
        </>
      )}
      <h3>中目標一覧</h3>
      <MilestoneList milestones={milestones} onDelete={deleteMilestone} />
    </>
  );
}
