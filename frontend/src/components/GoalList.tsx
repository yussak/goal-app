import Link from "next/link";
import { Goal } from "@/types";
import { useSession } from "next-auth/react";
import { SimpleDialog } from "./DeleteDialog";

type GoalListProps = {
  goals: Goal[];
  onDelete: (id: string) => void;
};

const GoalList = ({ goals, onDelete }: GoalListProps) => {
  const { data: session } = useSession();

  return goals && goals.length > 0 ? (
    <ul>
      {goals.map((goal, index) => {
        return (
          <li key={index} className="goal-list">
            <p>content: {goal.content}</p>
            <p>purpose: {goal.purpose}</p>
            <p>loss: {goal.loss}</p>
            <p>progress: {goal.progress}</p>
            <p>id: {goal.id}</p>
            <p>user_id（デバッグ用）: {goal.user_id}</p>
            {/* <p>CreatedAt: {goal.CreatedAt.toLocaleString()}</p>
            <p>UpdatedAt: {goal.UpdatedAt.toLocaleString()}</p> */}
            <p>
              <Link href={`/goals/${goal.id}`}>detail</Link>
            </p>
            {session?.user?.id === goal.user_id ? (
              <p>
                <SimpleDialog selectedValue={goal} onDelete={onDelete} />
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
