import React from 'react';
import { useNavigate } from 'react-router';
import moment from 'moment';
import Icon from '@mui/material/Icon'
import Fab from '@mui/material/Fab'
import Avatar from '@mui/material/Avatar'
import Divider from '@mui/material/Divider'
import Button from '@mui/material/Button'
import Build from '@mui/icons-material/Build';
import DeleteIcon from '@mui/icons-material/Delete';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Tooltip from '@mui/material/Tooltip';
import ListItem from '@mui/material/ListItem';
import { useDeleteLogMutation } from '../../store/api/maintenanceApi';
import { StyledListItem, StyledSecondaryAction, StyledAvatar, DeleteFab, StyledListText, ListItemGrid, ButtonGrid } from './styles';

const Log = ({ log, itemId, categoryId }) => {
  const navigate = useNavigate();
  const [deleteLog] = useDeleteLogMutation();
  const deleteLogClick = async () => {
    try {
      await deleteLog({ id: log.id, categoryId, itemId }).unwrap();
      setOpen(false);
      navigate(`/item/${itemId}/category/${categoryId}`);
    } catch (err) {
      // keep dialog open on failure
    }
  };

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
        onClick={() => navigate(`/item/${itemId}/log/${log.id}/edit`)}
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
          <Button onClick={() => deleteLogClick()} color="primary" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </ButtonGrid>
  );
  
  return (
    <ListItemGrid>
      <ListItem
        key={log.id}
        disablePadding
        secondaryAction={renderAdmin(log)}
        slots={{ secondaryAction: StyledSecondaryAction }}
      >
        <StyledListItem
          disableGutters
          onClick={() => navigate(`/log/${log.id}`)}
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
        </StyledListItem>
      </ListItem>
      <Divider />
    </ListItemGrid>
  )
}

export default Log