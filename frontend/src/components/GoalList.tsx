import Link from "next/link";
import { Goal } from "@/types";
import { useSession } from "next-auth/react";
import { DeleteDialog } from "./DeleteDialog";
import { Card, CardActions, CardContent, Typography } from "@mui/material";

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
            <Card sx={{ minWidth: 275 }}>
              <CardContent>
                <Typography variant="body1">
                  content: {goal.content}
                  {/* <p>purpose: {goal.purpose}</p>
            <p>loss: {goal.loss}</p>
            <p>phase: {goal.phase}</p>
            <p>progress: {goal.progress}</p> */}
                  {/* <p>id（デバッグ用）: {goal.id}</p> */}
                  {/* <p>userId（デバッグ用）: {goal.userId}</p> */}
                  {/* <p>CreatedAt: {goal.CreatedAt.toLocaleString()}</p>
            <p>UpdatedAt: {goal.UpdatedAt.toLocaleString()}</p> */}
                </Typography>
              </CardContent>
              <CardActions>
                <span>
                  <Link href={`/goals/${goal.id}`}>detail</Link>
                </span>
                {session?.user?.id === goal.userId && (
                  <span>
                    <DeleteDialog selectedValue={goal} onDelete={onDelete} />
                  </span>
                )}
              </CardActions>
            </Card>
          </li>
        );
      })}
    </ul>
  ) : (
    <p>目標はありません</p>
  );
};

export default GoalList;
