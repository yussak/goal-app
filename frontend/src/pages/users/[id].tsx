import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
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
  }, [router.isReady]);

  const getUserDetails = async () => {
    try {
      const { data } = await axios.get(
        process.env.NEXT_PUBLIC_API_URL + `/users/${id}`
      );
      setUser(data);
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
      <h2>ユーザー詳細</h2>
      {/* TODO:ユーザー詳細分をコンポーネントに切り出す */}
      {user && (
        <>
          <p>name: {user.name}</p>
        </>
      )}
      {/* TODO:そのユーザーのgoalだけ取得する */}
      <GoalList goals={goals} onDelete={deleteGoal} />
    </>
  );
}
