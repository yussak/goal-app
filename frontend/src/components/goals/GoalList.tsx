import { useGoals } from "@/utils/context";
import GoalContent from "./GoalContent";

const GoalList = (): JSX.Element => {
  const { goals } = useGoals();

  return goals && goals.length > 0 ? (
    <ul>
      {goals.map((goal, index) => {
        return (
          <li key={index} className="goal-list">
            <GoalContent goal={goal} />
          </li>
        );
      })}
    </ul>
  ) : (
    <p>目標はありません</p>
  );
};

export default GoalList;
