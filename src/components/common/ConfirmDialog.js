import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { errorMessage } from '../../store/api/errorMessage';

// Asks before doing something to a record. If it fails, the dialog stays open
// with the error.
const ConfirmDialog = ({ open, title, text, confirmLabel, error, busy, onConfirm, onClose }) => {
  const id = React.useId();
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby={`${id}-title`}
      aria-describedby={`${id}-text`}
    >
      <DialogTitle id={`${id}-title`}>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id={`${id}-text`}>{text}</DialogContentText>
        {error && (
          <DialogContentText color="error" role="alert">{errorMessage(error)}</DialogContentText>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={onConfirm} color="primary" disabled={busy}>
          {confirmLabel}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDialog;
