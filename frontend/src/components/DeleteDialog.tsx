import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import { useState } from "react";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { Goal } from "@/types";

export type SimpleDialogProps = {
  selectedValue: Goal | null;
  onDelete: (id: string) => void;
};

export function SimpleDialog(props: SimpleDialogProps) {
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
        startIcon={<DeleteOutlineIcon />}
      >
        目標を削除
      </Button>
      <Dialog onClose={handleClose} open={open}>
        <DialogTitle>目標を削除してよろしaerasdfいですか？</DialogTitle>
        <DialogContent>
          <Typography gutterBottom>
            目標を削除すると、それに紐づくマイルストーン、TODOも削除されます。
          </Typography>
          {/* <Typography gutterBottom>デバッグ用：{selectedValue?.id}</Typography>
            <Typography gutterBottom>
              デバッグ用：{selectedValue?.content}
            </Typography> */}
        </DialogContent>
        <DialogActions>
          <Button color="error" onClick={handleDelete}>
            目標を削除
          </Button>
          <Button
            onClick={() => {
              setOpen(false);
            }}
          >
            cancel
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
