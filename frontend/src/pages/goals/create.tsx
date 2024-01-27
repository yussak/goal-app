import GoalForm from "@/components/form/GoalForm";
import { GoalFormData } from "@/types";
import { axios } from "@/utils/axios";
import { authGuard } from "@/utils/authGuard";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { mutate } from "swr";

export default function CreateGoal() {
  authGuard();
  const router = useRouter();
  const { data: session } = useSession();

  const userId = session?.user && session.user.id;

  const addGoal = async (data: GoalFormData) => {
    const params = {
      ...data,
      userId: userId,
    };
    try {
      const res = await axios.post("/goal", params);

      const newGoalId = res.data.id;
      router.push(`/goals/${newGoalId}`);
      mutate(`/${userId}/goals`);
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
