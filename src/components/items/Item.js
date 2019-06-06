import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { connect } from 'react-redux'
import history from '../../history';
import { Route } from 'react-router-dom';
import ItemEdit from './ItemEdit';
import { ListItem, Container, ListItemText, ListItemAvatar, Box, Divider, Avatar, ListItemSecondaryAction, Fab, Icon } from '@material-ui/core';
import Link from '@material-ui/core/Link';
import Button from '@material-ui/core/Button'
import Build from '@material-ui/icons/Build';
import DeleteIcon from '@material-ui/icons/Delete';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';


const Item = ({ item, selectItem, deleteItemClick, editItemClick }) => {

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
      <ListItem 
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
        <ListItemSecondaryAction>
          {renderAdmin(item)}
        </ListItemSecondaryAction>
      </ListItem>
      <Divider />
    </Box>
  )
}

export default Item