import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import Button from '@material-ui/core/Button'
import Avatar from '@material-ui/core/Avatar'
import Icon from '@material-ui/core/Icon'
import Fab from '@material-ui/core/Fab'
import Build from '@material-ui/icons/Build';
import DeleteIcon from '@material-ui/icons/Delete';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Tooltip from '@material-ui/core/Tooltip';
import { StyledListItem, StyledSecondaryAction, StyledAvatar, StyledDivider, DeleteFab, StyledListText, ListItemGrid, ButtonGrid } from './styles';

const Item = ({ item, selectItem, deleteItemClick }) => {

  //Used in delete dialog pop up
  const [open, setOpen] = React.useState(false);
  const handleClickOpen= () => {
    setOpen(true);
  }
  const handleClose = () => {
    setOpen(false);
  }
  
  const renderAdmin = (item) => (
    <ButtonGrid>
      <Fab 
        color="secondary" 
        size="small"
        aria-label="Edit" 
        component={RouterLink} 
        to={`/item/${item.id}/edit`}
      >
        <Tooltip title="Edit" placement="top">
          <Icon>edit_icon</Icon>
        </Tooltip>
      </Fab>
      <DeleteFab
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
        <DialogTitle id="alert-dialog-title">{`Are you sure you want to delete ${item.name}?`}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            You will lose all records associated with this item.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={() => deleteItemClick(item.id)} color="primary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </ButtonGrid>

  );
    
  return (
    <ListItemGrid>
      <StyledListItem 
        key={item.id} 
        button 
        disableGutters
        onClick={() => selectItem(item.id)}
        item
      >
        <StyledAvatar>
          <Avatar>
            <Build />
          </Avatar>
        </StyledAvatar>
        <StyledListText primary={item.name} />
        <StyledSecondaryAction>
          {renderAdmin(item)}
        </StyledSecondaryAction>
      </StyledListItem>
      <StyledDivider />
    </ListItemGrid>
  )
}

export default Item