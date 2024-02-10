import { Milestone, MilestoneFormData } from "@/types";
import { axios } from "@/utils/axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import {
  FC,
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

type ContextType = {
  milestones: Milestone[];
  getMilestones: () => void;
  addMilestone: (data: MilestoneFormData) => void;
  deleteMilestone: (milestone_id: string) => void;
};

const MilestoneContext = createContext<ContextType>({} as ContextType);

export const useMilestone = () => useContext(MilestoneContext);

export const MilestoneProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const router = useRouter();
  const id = router.query.id;

  const { data: session } = useSession();
  const userId = session?.user ? session.user.id : null;

  useEffect(() => {
    if (router.isReady) {
      getMilestones();
    }
  }, [router.isReady]);

  const [milestones, setMilestones] = useState<Milestone[]>([]);

  const getMilestones = async () => {
    try {
      const { data } = await axios.get(`/goals/${id}/milestones`);
      setMilestones(data);
    } catch (error) {
      console.error(error);
    }
  };

  const addMilestone = async (data: MilestoneFormData) => {
    const params = {
      ...data,
      userId: session?.user?.id,
    };
    try {
      const res = await axios.post(`/goals/${id}/milestones`, params);
      await getMilestones();
    } catch (error) {
      console.error(error);
    }
  };

  const deleteMilestone = async (milestone_id: string) => {
    try {
      await axios.delete(`/milestones/${milestone_id}`);
      await getMilestones();
    } catch (error) {
      console.error("asdf", error);
    }
  };

  const value = {
    milestones: milestones || null,
    getMilestones,
    addMilestone,
    deleteMilestone,
  };

  return (
    <MilestoneContext.Provider value={value}>
      {children}
    </MilestoneContext.Provider>
  );
};
