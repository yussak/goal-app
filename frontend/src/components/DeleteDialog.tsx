import {
  Alert,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import { useState } from "react";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { Goal, Milestone } from "@/types";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

export type DeleteDialogProps = {
  selectedValue: Goal | Milestone | null;
  onDelete: (id: string) => void;
};

export function DeleteDialog(props: DeleteDialogProps) {
  const [open, setOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState<Goal | Milestone | null>(
    null
  );

  const [openSnackBar, setOpenSnackBar] = useState(false);

  const handleCloseSnackBar = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSnackBar(false);
  };

  const handleClickOpen = (value: Goal | Milestone | null) => {
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
        setOpenSnackBar(true);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const SnackBaraction = (
    <>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleCloseSnackBar}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </>
  );

  // 表示を切り替えるため、削除対象が目標かマイルストーン可判定する
  const isGoal = selectedValue && "loss" in selectedValue;

  return (
    <>
      <Button
        variant="outlined"
        onClick={() => handleClickOpen(props?.selectedValue)}
        startIcon={<DeleteOutlineIcon />}
      >
        削除
      </Button>
      <Dialog onClose={handleClose} open={open}>
        <DialogTitle>
          {isGoal ? "目標" : "マイルストーン"}を削除してよろしいですか？
        </DialogTitle>
        <DialogContent>
          <Typography gutterBottom component="div">
            {isGoal
              ? "目標を削除すると、それに紐づくマイルストーン、TODOも削除されます。"
              : "マイルストーンを削除すると、それに紐づくTODOも削除されます。"}
          </Typography>
          {/* <Typography gutterBottom component="div">デバッグ用：{selectedValue?.id}</Typography>
            <Typography gutterBottom component="div">
              デバッグ用：{selectedValue?.content}
            </Typography> */}
        </DialogContent>
        <DialogActions>
          <Button color="error" onClick={handleDelete}>
            {isGoal ? "目標" : "マイルストーン"}を削除
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

      <Snackbar
        open={openSnackBar}
        autoHideDuration={6000}
        onClose={handleCloseSnackBar}
        action={SnackBaraction}
      >
        <Alert
          onClose={handleCloseSnackBar}
          severity="success"
          variant="filled"
        >
          削除しました
        </Alert>
      </Snackbar>
    </>
  );
}
