import { useSession } from "next-auth/react";
import { DeleteDialog } from "../DeleteDialog";
import { Card, CardActions, CardContent, Typography } from "@mui/material";
import Link from "next/link";
import { Goal } from "@/types";
import { useGoals } from "@/contexts/goalContext";

type Props = {
  goal: Goal;
};

const GoalContent = ({ goal }: Props) => {
  const { data: session } = useSession();
  const { deleteGoal } = useGoals();

  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography variant="body1">
          {goal.content}
          {/* <p>purpose: {goal.purpose}</p>
              <p>benefit: {goal.benefit}</p>
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
            <DeleteDialog selectedValue={goal} onDelete={deleteGoal} />
          </span>
        )}
      </CardActions>
    </Card>
  );
};

export default GoalContent;
