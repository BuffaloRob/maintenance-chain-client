import React from 'react';
import moment from 'moment';
import { Link as RouterLink, withRouter } from 'react-router-dom';
import { ListItem, Container, ListItemText, ListItemAvatar, Box, Divider, Avatar, ListItemSecondaryAction, Icon, Fab, Tooltip } from '@material-ui/core';
import Button from '@material-ui/core/Button'
import Build from '@material-ui/icons/Build';
import DeleteIcon from '@material-ui/icons/Delete';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';


const Log = ({ log, selectLog, match, itemId, categoryId, deleteLogClick, editLogClick }) => {

  //need to find a place to put formatted date where it will update. The date_performed is updating
  // Date being displayed is a day behind the day being selected
  const formattedDate = moment(log.date_performed).format("MMM Do YYYY");

  //Used in delete dialog pop up
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  }
  const handleClose = () => {
    setOpen(false);
  }

  const renderAdmin = () => (
    
    <Container >
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

    </Container>
  );
  
  return (
    <Box>
      <ListItem
        key={log.id}
        button
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