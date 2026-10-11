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
import useMediaQuery from '@mui/material/useMediaQuery';
import AddAPhoto from '@mui/icons-material/AddAPhoto';
import AddPhotoAlternate from '@mui/icons-material/AddPhotoAlternate';
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

// Out of sight; its button opens it
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

// A button that opens a file input for a photo, and shows a spinner while
// the photo it gave is saved. With capture, phones open the rear camera
// rather than offering the photos they already have.
const PhotoButton = ({ label, capture, saving, disabled, onPhoto, children }) => {
  const input = React.useRef(null);
  return (
    <>
      <Tooltip title={label}>
        {/* The span lets the tooltip work while the button is disabled */}
        <span>
          <IconButton color="primary" aria-label={label} onClick={() => input.current.click()} disabled={disabled}>
            {saving ? <CircularProgress size={24} aria-label="Saving receipt" /> : children}
          </IconButton>
        </span>
      </Tooltip>
      <input
        ref={input}
        type="file"
        accept="image/*"
        capture={capture}
        onChange={event => {
          const [file] = event.target.files;
          event.target.value = ''; // so the same file can be picked again
          if (file) onPhoto(file);
        }}
        tabIndex={-1}
        aria-hidden="true"
        style={hiddenInput}
      />
    </>
  );
};

const TAKE = 'Take a photo of a receipt';
const CHOOSE = 'Choose a photo of a receipt';

// A log's photos of receipts: an icon for each, which shows it, and buttons
// that add another, taken with the camera or chosen from the photos already
// on the device
const Receipts = ({ log, itemId }) => {
  const ids = { itemId, categoryId: log.category_id, logId: log.id };
  const { data: receipts = [], error } = useGetReceiptsQuery(ids);
  const [uploadReceipt] = useUploadReceiptMutation();
  // The label of the button whose photo is being saved
  const [savingFrom, setSavingFrom] = React.useState(null);
  const [saveError, setSaveError] = React.useState(null);
  const [shown, setShown] = React.useState(null);
  // Touchscreens: phones and tablets. A computer's browser opens the same
  // file picker for both buttons, so it only gets the one for choosing.
  const touchscreen = useMediaQuery('(pointer: coarse)', { noSsr: true });

  const save = from => async file => {
    setSavingFrom(from);
    setSaveError(null);
    try {
      await uploadReceipt({ ...ids, photo: await shrinkPhoto(file) }).unwrap();
    } catch (err) {
      // shrinkPhoto rejects with an Error, a failed upload with { status, data }
      setSaveError(err instanceof Error ? "Couldn't read that photo. Try another one." : errorMessage(err));
    } finally {
      setSavingFrom(null);
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
      {touchscreen && (
        <PhotoButton
          label={TAKE}
          capture="environment"
          saving={savingFrom === TAKE}
          disabled={!!savingFrom}
          onPhoto={save(TAKE)}
        >
          <AddAPhoto />
        </PhotoButton>
      )}
      <PhotoButton label={CHOOSE} saving={savingFrom === CHOOSE} disabled={!!savingFrom} onPhoto={save(CHOOSE)}>
        <AddPhotoAlternate />
      </PhotoButton>
      {message && (
        <Typography color="error" role="alert" sx={{ flexBasis: '100%' }}>{message}</Typography>
      )}
      {shown && <ReceiptDialog {...shown} log={ids} onClose={() => setShown(null)} />}
    </Box>
  );
};

export default Receipts;
