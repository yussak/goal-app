import { useGoals } from "@/utils/context";
import { Goal } from "@/types";
import GoalContent from "./GoalContent";

type GoalListProps = {
  onDelete: (id: string) => void;
};

const GoalList = ({ onDelete }: GoalListProps) => {
  const goals: Goal[] | null = useGoals();

  return goals && goals.length > 0 ? (
    <ul>
      {goals.map((goal, index) => {
        return (
          <li key={index} className="goal-list">
            {/* todo:onDeleteのバケツリレーをなくす */}
            <GoalContent goal={goal} onDelete={onDelete} />
          </li>
        );
      })}
    </ul>
  ) : (
    <p>目標はありません</p>
  );
};

export default GoalList;
