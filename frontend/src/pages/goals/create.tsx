import GoalForm from "@/components/form/GoalForm";
import { GoalFormData } from "@/types";
import { axios } from "@/utils/axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";
import { mutate } from "swr";

export default function createGoal() {
  const router = useRouter();

  const [goalData, SetGoalData] = useState<GoalFormData>({
    purpose: "",
    loss: "",
    smartS: "",
    smartM: "",
    smartA: "",
    smartR: "",
    smartT: "",
  });

  const handleSetGoalData = <K extends keyof GoalFormData>(
    key: K,
    value: GoalFormData[K]
  ) => {
    SetGoalData((prev) => ({ ...prev, [key]: value }));
  };
  const { data: session } = useSession();

  const addGoal = async (data: GoalFormData) => {
    const params = {
      ...data,
      user_id: session?.user?.id,
    };
    try {
      // TODO:useSWRMutationで書き換えられそう？調べる
      const res = await axios.post("/goal", params);

      const newGoalId = res.data.id;
      router.push(`/goals/${newGoalId}`);
      //   router.pushで移動するならフォームリセットは不要そう
      // useSWRで書き換える
      mutate(`/${user_id}/goals`);
    } catch (error) {
      console.error(error);
    }
  };

  const user_id = session?.user ? session.user.id : null;

  return (
    <>
      {session?.user && (
        <>
          debug用 id: {session?.user.id}
          <GoalForm
            SetGoalData={handleSetGoalData}
            goalData={goalData}
            addGoal={addGoal}
          />
        </>
      )}
    </>
  );
}
