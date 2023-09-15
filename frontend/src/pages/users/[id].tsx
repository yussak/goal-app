import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { axios } from "@/utils/axios";
import { Goal, User } from "@/types";
import GoalList from "@/components/GoalList";

export default function UserDetail() {
  const [user, setUser] = useState<User | null>(null);
  const [goals, setGoals] = useState<Goal[]>([]);

  const router = useRouter();
  const id = router.query.id;

  useEffect(() => {
    if (!router.isReady) return;
    getUserDetails();
    getGoals();
  }, [router.isReady]);

  const getUserDetails = async () => {
    try {
      const { data } = await axios.get(`/users/${id}/details`);
      setUser(data);
    } catch (error) {
      console.error(error);
    }
  };

  const getGoals = async () => {
    try {
      const { data } = await axios.get(`/users/${id}/goals`);
      setGoals(data);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteGoal = async (id: string) => {
    try {
      await axios.delete(`/goal/${id}`);
      await getGoals();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <h2>ユーザー詳細</h2>

      {user && <p>name: {user.name}</p>}

      <h3>目標一覧</h3>
      <GoalList goals={goals} onDelete={deleteGoal} />
    </>
  );
}
