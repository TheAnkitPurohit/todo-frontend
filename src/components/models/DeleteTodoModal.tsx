import React from 'react';

import {
  Dialog,
  Button,
  DialogTitle,
  DialogActions,
  DialogContent,
  DialogContentText,
} from '@mui/material';

interface DeleteTodoModalProps {
  open: boolean;
  handleClose: () => void;
  handleDelete: () => void;
}

const DeleteTodoModal = ({ open, handleClose, handleDelete }: DeleteTodoModalProps) => (
  <Dialog
    open={open}
    onClose={handleClose}
    aria-labelledby="alert-dialog-title"
    aria-describedby="alert-dialog-description"
  >
    <DialogTitle id="alert-dialog-title">Delete Todo?</DialogTitle>
    <DialogContent>
      <DialogContentText id="alert-dialog-description">
        Are you sure to delete this Todo? This can not reversible.
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button onClick={handleClose}>Disagree</Button>
      <Button onClick={handleDelete} autoFocus>
        Agree
      </Button>
    </DialogActions>
  </Dialog>
);

export default DeleteTodoModal;
