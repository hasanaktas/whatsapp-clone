import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  DialogContentText,
} from "@mui/material";

const RemoveMessageDialog = (props) => {
  const { message, open, handleClose, remove } = props;
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        Mesaji silmek istiyor musun ?
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {message.content}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Vazgeç</Button>
        <Button onClick={remove} autoFocus>
          Sil
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default RemoveMessageDialog;
