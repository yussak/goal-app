import { Milestone } from "@/types";
import { axios } from "@/utils/axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export const useMilestones = () => {
  const router = useRouter();
  const goalId = router.query.id;

  useEffect(() => {
    if (goalId) {
      getMilestones();
    }
  }, [goalId]);

  const [milestones, setMilestones] = useState<Milestone[]>([]);

  const getMilestones = async () => {
    try {
      const { data } = await axios.get(`/goals/${goalId}/milestones`);
      setMilestones(data);
    } catch (error) {
      console.error(error);
    }
  };

  return { milestones };
};
