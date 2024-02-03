import { useSession } from "next-auth/react";
import { DeleteDialog } from "../DeleteDialog";
import { Card, CardActions, CardContent, Typography } from "@mui/material";
import Link from "next/link";
import { Goal } from "@/types";

type GoalContent = {
  goal: Goal;
  onDelete: (id: string) => void;
};

const GoalContent = ({ goal, onDelete }: GoalContent) => {
  const { data: session } = useSession();

  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography variant="body1">
          {goal.content}
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
  );
};

export default GoalContent;
