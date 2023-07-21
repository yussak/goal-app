import Link from "next/link";
import { Goal } from "@/types";
import { useUser } from "@/contexts/userContext";

type GoalListProps = {
  goals: Goal[];
  onDelete: (id: string) => void;
};

const GoalList = ({ goals, onDelete }: GoalListProps) => {
  const { user } = useUser();
  // TODO: 新しいのを上にする
  return goals && goals.length > 0 ? (
    <ul>
      {goals.map((goal, index) => {
        return (
          <li key={index}>
            <p>title: {goal.title}</p>
            <p>text: {goal.text}</p>
            <p>id: {goal.id}</p>
            <p>user_id（デバッグ用）: {goal.user_id}</p>
            <p>
              <Link href={`/goals/${goal.id}`}>detail</Link>
            </p>
            {user && user.id === goal.user_id ? (
              <p>
                <button onClick={() => onDelete(goal.id)}>delete</button>
              </p>
            ) : (
              ""
            )}
          </li>
        );
      })}
    </ul>
  ) : (
    <p>目標はありません</p>
  );
};

export default GoalList;
