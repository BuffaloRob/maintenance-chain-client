import React from 'react';
import moment from 'moment';
import Icon from '@material-ui/core/Icon'
import Fab from '@material-ui/core/Fab'
import Avatar from '@material-ui/core/Avatar'
import Divider from '@material-ui/core/Divider'
import Button from '@material-ui/core/Button'
import Build from '@material-ui/icons/Build';
import DeleteIcon from '@material-ui/icons/Delete';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Tooltip from '@material-ui/core/Tooltip';
import { StyledListItem, StyledSecondaryAction, StyledAvatar, DeleteFab, StyledListText, ListItemGrid, ButtonGrid } from './styles';

const Log = ({ log, selectLog, match, itemId, categoryId, deleteLogClick, editLogClick }) => {

  const datePerformed = moment(log.date_performed).format("MMM Do YYYY");
  const dateDue = moment(log.date_due).format("MMM Do YYYY");

  //Used in delete dialog pop up
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  }
  const handleClose = () => {
    setOpen(false);
  }
  ////
  const renderAdmin = () => (
    <ButtonGrid>
      <Fab
        color="secondary"
        size="small"
        aria-label="Edit"
        onClick={() => editLogClick(log.id, itemId)}
      >
        <Tooltip title="Edit" placement="top">
          <Icon>edit_icon</Icon>
        </Tooltip>
      </Fab>
      <DeleteFab
        color="primary"
        size="small"
        aria-label="Delete"
        onClick={handleClickOpen}
      >
        <Tooltip title="Delete" placement="top">
          <DeleteIcon />
        </Tooltip>
      </DeleteFab>

      {/* Dialog code used for delete confirmation */}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{`Are you sure you want to delete the log for ${datePerformed}?`}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            You will lose all records associated with this log.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={() => deleteLogClick(log.id, categoryId, itemId)} color="primary" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </ButtonGrid>
  );
  
  return (
    <ListItemGrid>
      <StyledListItem
        key={log.id}
        button
        disableGutters
        onClick={() => selectLog(log.id, itemId, categoryId)}
      >
        <StyledAvatar>
          <Avatar>
            <Build />
          </Avatar>
        </StyledAvatar>
        <StyledListText 
          primary={datePerformed}
          secondary={`Due on: ${dateDue}`}
          
        />
        <StyledSecondaryAction>
          {renderAdmin(log)}
        </StyledSecondaryAction>
      </StyledListItem>
      <Divider />
    </ListItemGrid>
  )
}

export default Log