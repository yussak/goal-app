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
  open: boolean;
  selectedValue: Goal | null;
  onClose: (value: Goal | null) => void;
};

function SimpleDialog(props: SimpleDialogProps) {
  // const { onClose, selectedValue, open } = props;
  const [open, setOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState<Goal | null>(null);

  // const handleClickOpen = () => {
  const handleClickOpen = (value: Goal | null) => {
    setSelectedValue(value);
    setOpen(true);
  };

  // const handleClose = () => {
  //   // setOpen(false);
  // };

  const handleClose = () => {
    setOpen(false);
    // onClose(selectedValue);
  };

  return (
    <>
      {/* <Button variant="outlined" onClick={() => handleClickOpen()}> */}
      <Button
        variant="outlined"
        onClick={() => handleClickOpen(props?.selectedValue)}
      >
        {/* <Button variant="outlined" onClick={() => handleClickOpen(goal)}> */}
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
        </List>
      </Dialog>
    </>
  );
}

const GoalList = ({ goals, onDelete }: GoalListProps) => {
  const { data: session } = useSession();
  // const [open, setOpen] = useState(false);
  // const [selectedValue, setSelectedValue] = useState<Goal | null>(null);

  // const handleClickOpen = (value: Goal) => {
  //   setSelectedValue(value);
  //   setOpen(true);
  // };

  // const handleClose = () => {
  //   setOpen(false);
  // };

  return goals && goals.length > 0 ? (
    <ul>
      {goals.map((goal, index) => {
        return (
          <li key={index} className="goal-list">
            {/* <p>content: {goal.content}</p>
            <p>purpose: {goal.purpose}</p>
            <p>loss: {goal.loss}</p>
            <p>progress: {goal.progress}</p> */}
            <p>id: {goal.id}</p>
            {/* <p>user_id（デバッグ用）: {goal.user_id}</p>
            <p>CreatedAt: {goal.CreatedAt.toLocaleString()}</p>
            <p>UpdatedAt: {goal.UpdatedAt.toLocaleString()}</p> */}
            <p>
              <Link href={`/goals/${goal.id}`}>detail</Link>
            </p>
            {session?.user?.id === goal.user_id ? (
              <p>
                {/* <Button
                  variant="outlined"
                  onClick={() => handleClickOpen(goal)}
                >
                  Open simple dialog
                </Button> */}
                <SimpleDialog
                  selectedValue={goal}
                  // selectedValue={selectedValue}
                  // open={open}
                  // onClose={handleClose}
                  // onDelete={onDelete}
                />
                {/* <button onClick={() => onDelete(goal.id)}>delete</button> */}
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
