import Link from "next/link";
import { Goal } from "@/types";
import { useSession } from "next-auth/react";
import {
  Button,
  Dialog,
  DialogTitle,
  List,
  ListItem,
  ListItemButton,
} from "@mui/material";
import { useState } from "react";

type GoalListProps = {
  goals: Goal[];
  onDelete: (id: string) => void;
};

export type SimpleDialogProps = {
  selectedValue: Goal | null;
  onDelete: (id: string) => void;
};

function SimpleDialog(props: SimpleDialogProps) {
  const [open, setOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState<Goal | null>(null);

  const handleClickOpen = (value: Goal | null) => {
    setSelectedValue(value);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = async () => {
    if (selectedValue && selectedValue.id) {
      try {
        await props.onDelete(selectedValue?.id);
        setOpen(false);
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <>
      <Button
        variant="outlined"
        onClick={() => handleClickOpen(props?.selectedValue)}
      >
        Open simple dialog
      </Button>
      <Dialog onClose={handleClose} open={open}>
        <DialogTitle>Set backup account</DialogTitle>
        <List sx={{ pt: 0 }}>
          <ListItem disableGutters>
            <ListItemButton autoFocus>{selectedValue?.id}</ListItemButton>
          </ListItem>
          <ListItem disableGutters>
            <ListItemButton autoFocus>{selectedValue?.content}</ListItemButton>
          </ListItem>
          <Button onClick={handleDelete}>delete</Button>
        </List>
      </Dialog>
    </>
  );
}

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
