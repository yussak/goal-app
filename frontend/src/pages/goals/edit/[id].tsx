import EditGoalForm from "@/components/form/EditGoalForm";
import { GoalFormData } from "@/types";
import { axios } from "@/utils/axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function EditGoal() {
  const router = useRouter();
  const id = router.query.id;

  const [goalData, SetGoalData] = useState<GoalFormData>({
    purpose: "",
    loss: "",
    specific: "",
    measurable: "",
    achievable: "",
    relevant: "",
    timeBound: "",
    file: null,
    imageURL: null,
  });

  const handleSetGoalData = <K extends keyof GoalFormData>(
    key: K,
    value: GoalFormData[K]
  ) => {
    SetGoalData((prev) => ({ ...prev, [key]: value }));
  };

  const { data: session } = useSession();

  useEffect(() => {
    if (router.isReady) {
      getGoal();
    }
  }, [router.isReady]);

  const getGoal = async () => {
    try {
      const { data } = await axios.get(`/goals/${id}`);
      console.log("asdf", data);
      SetGoalData({
        ...goalData,
        purpose: data.purpose,
        loss: data.loss,
        specific: data.specific,
        measurable: data.measurable,
        achievable: data.achievable,
        relevant: data.relevant,
        timeBound: data.time_bound,
        imageURL: data.image_url,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const editGoal = async () => {
    const formData = new FormData();
    if (goalData.file !== null) {
      formData.append("image", goalData.file);
    }
    formData.append("purpose", goalData.purpose);
    formData.append("loss", goalData.loss);
    formData.append("specific", goalData.specific);
    formData.append("measurable", goalData.measurable);
    formData.append("achievable", goalData.achievable);
    formData.append("relevant", goalData.relevant);
    formData.append("timeBound", goalData.timeBound);
    if (session?.user?.id) {
      formData.append("user_id", session?.user.id);
    }

    try {
      await axios.put(`/goals/edit/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      router.push(`/goals/${id}`);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteGoalImage = async () => {
    try {
      await axios.delete(`/goal/${id}/image`);
      router.push(`/goals/${id}`);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <h2>目標編集</h2>

      <EditGoalForm
        editGoal={editGoal}
        deleteGoalImage={deleteGoalImage}
        SetGoalData={handleSetGoalData}
        goalData={goalData}
      />
    </>
  );
}
