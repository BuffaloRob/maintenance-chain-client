import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import AddAPhoto from '@mui/icons-material/AddAPhoto';
import ReceiptLong from '@mui/icons-material/ReceiptLong';
import {
  useDeleteReceiptMutation,
  useGetReceiptImageQuery,
  useGetReceiptsQuery,
  useUploadReceiptMutation,
} from '../../store/api/maintenanceApi';
import { errorMessage } from '../../store/api/errorMessage';
import { useWideLayout } from '../common/PageLayout';
import { shrinkPhoto } from './shrinkPhoto';

// Out of sight; the camera button opens it
const hiddenInput = {
  position: 'absolute',
  width: 1,
  height: 1,
  overflow: 'hidden',
  clip: 'rect(0 0 0 0)',
  opacity: 0,
};

// One receipt's photo, with a way to delete it
const ReceiptDialog = ({ receipt, number, log, onClose }) => {
  const { data: src, error } = useGetReceiptImageQuery({ ...log, id: receipt.id });
  const [deleteReceipt, { isLoading: isDeleting, error: deleteError }] = useDeleteReceiptMutation();
  const [confirming, setConfirming] = React.useState(false);
  // Phones give the receipt the whole screen
  const fullScreen = !useWideLayout();

  const deleteClick = async () => {
    try {
      await deleteReceipt({ ...log, id: receipt.id }).unwrap();
      onClose();
    } catch (err) {
      // keep the dialog open; the error is shown in it
    }
  };

  return (
    <Dialog open onClose={onClose} fullScreen={fullScreen} maxWidth="md" aria-labelledby="receipt-dialog-title">
      <DialogTitle id="receipt-dialog-title">Receipt {number}</DialogTitle>
      <DialogContent>
        {src ? (
          <Box
            component="img"
            src={src}
            alt={`Receipt ${number}`}
            sx={{ display: 'block', maxWidth: '100%', maxHeight: '70vh', mx: 'auto' }}
          />
        ) : error ? (
          <DialogContentText color="error" role="alert">{errorMessage(error)}</DialogContentText>
        ) : (
          <CircularProgress aria-label="Loading receipt" sx={{ display: 'block', mx: 'auto' }} />
        )}
        {deleteError && (
          <DialogContentText color="error" role="alert">{errorMessage(deleteError)}</DialogContentText>
        )}
      </DialogContent>
      <DialogActions>
        {confirming ? (
          <>
            <Typography sx={{ mr: 'auto' }}>Delete this receipt?</Typography>
            <Button onClick={() => setConfirming(false)}>Cancel</Button>
            <Button onClick={deleteClick} disabled={isDeleting}>Delete</Button>
          </>
        ) : (
          <>
            <Button onClick={() => setConfirming(true)} sx={{ mr: 'auto' }}>Delete</Button>
            <Button onClick={onClose} autoFocus>Close</Button>
          </>
        )}
      </DialogActions>
    </Dialog>
  );
};

// A log's photos of receipts: an icon for each, which shows it, and a button
// that takes another with the phone's camera (or picks a file on a computer)
const Receipts = ({ log, itemId }) => {
  const ids = { itemId, categoryId: log.category_id, logId: log.id };
  const { data: receipts = [], error } = useGetReceiptsQuery(ids);
  const [uploadReceipt] = useUploadReceiptMutation();
  const [saving, setSaving] = React.useState(false);
  const [saveError, setSaveError] = React.useState(null);
  const [shown, setShown] = React.useState(null);
  const input = React.useRef(null);

  const save = async event => {
    const [file] = event.target.files;
    event.target.value = ''; // so the same file can be picked again
    if (!file) return;
    setSaving(true);
    setSaveError(null);
    try {
      await uploadReceipt({ ...ids, photo: await shrinkPhoto(file) }).unwrap();
    } catch (err) {
      // shrinkPhoto rejects with an Error, a failed upload with { status, data }
      setSaveError(err instanceof Error ? "Couldn't read that photo. Try taking it again." : errorMessage(err));
    } finally {
      setSaving(false);
    }
  };

  const message = saveError || (error && errorMessage(error));
  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', mt: -0.5 }}>
      {receipts.map((receipt, index) => (
        <Tooltip key={receipt.id} title={`Receipt ${index + 1}`}>
          <IconButton
            aria-label={`View receipt ${index + 1}`}
            onClick={() => setShown({ receipt, number: index + 1 })}
          >
            <ReceiptLong />
          </IconButton>
        </Tooltip>
      ))}
      <Tooltip title="Take a photo of a receipt">
        {/* The span lets the tooltip work while the button is disabled */}
        <span>
          <IconButton
            color="primary"
            aria-label="Take a photo of a receipt"
            onClick={() => input.current.click()}
            disabled={saving}
          >
            {saving ? <CircularProgress size={24} aria-label="Saving receipt" /> : <AddAPhoto />}
          </IconButton>
        </span>
      </Tooltip>
      {/* capture opens the rear camera on phones */}
      <input
        ref={input}
        type="file"
        accept="image/*"
        capture="environment"
        onChange={save}
        tabIndex={-1}
        aria-hidden="true"
        style={hiddenInput}
      />
      {message && (
        <Typography color="error" role="alert" sx={{ flexBasis: '100%' }}>{message}</Typography>
      )}
      {shown && <ReceiptDialog {...shown} log={ids} onClose={() => setShown(null)} />}
    </Box>
  );
};

export default Receipts;
