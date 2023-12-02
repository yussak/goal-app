import { Milestone } from "@/types";

type MilestoneListProps = {
  milestones: Milestone[];
  onDelete: (id: string) => void;
};

const MilestoneList = ({ milestones, onDelete }: MilestoneListProps) => {
  return milestones && milestones.length > 0 ? (
    <ul>
      {milestones.map((milestone, index) => {
        return (
          <li key={index}>
            <p>content: {milestone.content}</p>
            <p>id（デバッグ用）: {milestone.id}</p>
            <p>goal_id（デバッグ用）: {milestone.goal_id}</p>
            <button onClick={() => onDelete(milestone.id)}>delete</button>
          </li>
        );
      })}
    </ul>
  ) : (
    <p>中目標はありません</p>
  );
};

export default MilestoneList;
