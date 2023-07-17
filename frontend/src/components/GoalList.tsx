import Link from "next/link";
import { Goal } from "@/types";

type GoalListProps = {
  goals: Goal[];
  onDelete: (id: string) => void;
};

const GoalList = ({ goals, onDelete }: GoalListProps) => {
  return goals && goals.length > 0 ? (
    <ul>
      {goals.map((goal, index) => {
        return (
          <li key={index}>
            <p>
              title: {goal.title}
              text: {goal.text}
              <button onClick={() => onDelete(goal.id)}>delete</button>
              <Link href={`/goals/${goal.id}`}>detail</Link>
            </p>
            <p>id: {goal.id}</p>
            <p>user_id（デバッグ用）: {goal.user_id}</p>
          </li>
        );
      })}
    </ul>
  ) : (
    <p>目標はありません</p>
  );
};

export default GoalList;
