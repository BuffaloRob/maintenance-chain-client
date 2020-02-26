import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Button from '@material-ui/core/Button'
import Divider from '@material-ui/core/Divider'
import Avatar from '@material-ui/core/Avatar'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import Icon from '@material-ui/core/Icon'
import Fab from '@material-ui/core/Fab'
import Box from '@material-ui/core/Box'
import Build from '@material-ui/icons/Build';
import DeleteIcon from '@material-ui/icons/Delete';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { StyledListItem, StyledSecondaryAction } from './styles';

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

    <Box textAlign='right' >
      <Fab 
        color="secondary" 
        size="small"
        aria-label="Edit" 
        component={RouterLink} 
        to={`/item/${item.id}/edit`}
      >
        <Icon>edit_icon</Icon>
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
          <Button onClick={() => deleteItemClick(item.id)} color="primary" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>

  );
    
  return (
    <Box>
      <StyledListItem 
        key={item.id} 
        button 
        disableGutters
        // alignItems="flex-start"
        onClick={() => selectItem(item.id)}
      >
        <ListItemAvatar>
          <Avatar>
            <Build />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary={item.name} />
        <StyledSecondaryAction>
          {renderAdmin(item)}
        </StyledSecondaryAction>
      </StyledListItem>
      <Divider />
    </Box>
  )
}

export default Item