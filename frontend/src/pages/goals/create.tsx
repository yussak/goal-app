import GoalForm from "@/components/form/GoalForm";
import { GoalFormData } from "@/types";
import { axios } from "@/utils/axios";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { mutate } from "swr";

export default function createGoal() {
  const [goalData, SetGoalData] = useState<GoalFormData>({
    purpose: "",
    loss: "",
    smartSpecific: "",
    smartMeasurable: "",
    smartAchievable: "",
    smartRelevant: "",
    smartTimeBound: "",
  });

  const handleSetGoalData = <K extends keyof GoalFormData>(
    key: K,
    value: GoalFormData[K]
  ) => {
    SetGoalData((prev) => ({ ...prev, [key]: value }));
  };
  const { data: session } = useSession();

  const addGoal = async () => {
    const formData = new FormData();
    formData.append("purpose", goalData.purpose);
    formData.append("loss", goalData.loss);
    formData.append("smartSpecific", goalData.smartSpecific);
    formData.append("smartMeasurable", goalData.smartMeasurable);
    formData.append("smartAchievable", goalData.smartAchievable);
    formData.append("smartRelevant", goalData.smartRelevant);
    formData.append("smartTimeBound", goalData.smartTimeBound);
    if (session?.user) {
      formData.append("user_id", session?.user.id);
    }
    try {
      // TODO:useSWRMutationで書き換えられそう？調べる
      await axios.post("/goal", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      // useSWRで書き換える
      mutate(`/${user_id}/goals`);
      // TODO:フォームリセットしたい→地味に今までと違うやり方必要そうなので調べる
      // setTitle("");
      // setText("");
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
