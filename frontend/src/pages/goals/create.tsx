import GoalForm from "@/components/form/GoalForm";
import { GoalFormData } from "@/types";
import { axios } from "@/utils/axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { mutate } from "swr";

export default function createGoal() {
  const router = useRouter();
  const { data: session } = useSession();

  const user_id = session?.user && session.user.id;

  const addGoal = async (data: GoalFormData) => {
    const params = {
      ...data,
      user_id: user_id,
    };
    try {
      const res = await axios.post("/goal", params);

      const newGoalId = res.data.id;
      router.push(`/goals/${newGoalId}`);
      mutate(`/${user_id}/goals`);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <>
        {/* debug用 id: {session?.user.id} */}
        <GoalForm addGoal={addGoal} />
      </>
    </>
  );
}
