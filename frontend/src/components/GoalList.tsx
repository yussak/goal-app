import Link from "next/link";
import { Goal } from "@/types";
import { useSession } from "next-auth/react";

type GoalListProps = {
  goals: Goal[];
  onDelete: (id: string) => void;
};

const GoalList = ({ goals, onDelete }: GoalListProps) => {
  const { data: session } = useSession();

  // TODO: 新しいのを上にする
  return goals && goals.length > 0 ? (
    <ul>
      {goals.map((goal, index) => {
        const isEdited = goal.CreatedAt !== goal.UpdatedAt;
        return (
          <li key={index} className="goal-list">
            <p>title: {goal.title}</p>
            <p>text: {goal.text}</p>
            <p>id: {goal.id}</p>
            <p>user_id（デバッグ用）: {goal.user_id}</p>
            <p>CreatedAt: {goal.CreatedAt.toLocaleString()}</p>
            <p>UpdatedAt: {goal.UpdatedAt.toLocaleString()}</p>
            {goal.image_url && (
              <>
                <p>画像あり（デバッグ用）</p>
                <img src={goal.image_url} alt="asdf" />
              </>
            )}
            <p>
              <Link href={`/goals/${goal.id}`}>detail</Link>
            </p>
            {session?.user?.id === goal.user_id ? (
              <p>
                <button onClick={() => onDelete(goal.id)}>delete</button>
              </p>
            ) : (
              ""
            )}
            {isEdited && <p>編集済み</p>}
          </li>
        );
      })}
    </ul>
  ) : (
    <p>目標はありません</p>
  );
};

export default GoalList;
