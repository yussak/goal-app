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
import { Goal } from "@/types";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

export type SimpleDialogProps = {
  selectedValue: Goal | null;
  onDelete: (id: string) => void;
};

export function SimpleDialog(props: SimpleDialogProps) {
  const [open, setOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState<Goal | null>(null);

  const [openSB, setOpenSB] = useState(false);

  const handleCloseSB = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSB(false);
  };

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
        setOpenSB(true);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const SBaction = (
    <>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleCloseSB}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </>
  );

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
          <Typography gutterBottom component="div">
            目標を削除すると、それに紐づくマイルストーン、TODOも削除されます。
          </Typography>
          {/* <Typography gutterBottom component="div">デバッグ用：{selectedValue?.id}</Typography>
            <Typography gutterBottom component="div">
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

      <Snackbar
        open={openSB}
        autoHideDuration={6000}
        onClose={handleCloseSB}
        action={SBaction}
      >
        <Alert onClose={handleCloseSB} severity="success" variant="filled">
          目標を削除しました
        </Alert>
      </Snackbar>
    </>
  );
}
