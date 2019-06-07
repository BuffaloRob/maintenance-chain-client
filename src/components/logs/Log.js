import React from 'react';
import moment from 'moment';
import { ListItem, ListItemText, ListItemAvatar, Box, Divider, Avatar, ListItemSecondaryAction, Icon, Fab, Tooltip } from '@material-ui/core';
import Button from '@material-ui/core/Button'
import Build from '@material-ui/icons/Build';
import DeleteIcon from '@material-ui/icons/Delete';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';


const Log = ({ log, selectLog, match, itemId, categoryId, deleteLogClick, editLogClick }) => {

  const formattedDate = moment(log.date_performed).format("MMM Do YYYY");

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
    
    <Box textAlign='right' >
      <Fab
        color="secondary"
        size="small"
        aria-label="Edit"
        onClick={() => editLogClick(log.id, itemId)}
      >
        <Tooltip title="edit">
          <Icon>edit_icon</Icon>
        </Tooltip>
      </Fab>
      <Fab
        color="primary"
        size="small"
        aria-label="Delete"
        onClick={handleClickOpen}
      >
        <DeleteIcon />
      </Fab>

      {/* Dialog code used for delete confirmation */}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{`Are you sure you want to delete the log for ${formattedDate}?`}</DialogTitle>
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

    </Box>
  );
  
  return (
    <Box>
      <ListItem
        key={log.id}
        button
        disableGutters
        // alignItems="flex-start"
        onClick={() => selectLog(log.id, itemId, categoryId)}
      >
        <ListItemAvatar>
          <Avatar>
            <Build />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary={formattedDate} />
        <ListItemSecondaryAction>
          {renderAdmin(log)}
        </ListItemSecondaryAction>
      </ListItem>
      <Divider />
    </Box>
  )
}

export default Log