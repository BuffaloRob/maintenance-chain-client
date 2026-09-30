import React from 'react';
import { Link as RouterLink, useNavigate } from 'react-router';
import Button from '@mui/material/Button'
import Avatar from '@mui/material/Avatar'
import Icon from '@mui/material/Icon'
import Fab from '@mui/material/Fab'
import Build from '@mui/icons-material/Build';
import DeleteIcon from '@mui/icons-material/Delete';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Tooltip from '@mui/material/Tooltip';
import ListItem from '@mui/material/ListItem';
import { useDeleteItemMutation } from '../../store/api/maintenanceApi';
import { StyledListItem, StyledSecondaryAction, StyledAvatar, StyledDivider, DeleteFab, StyledListText, ListItemGrid, ButtonGrid } from './styles';

const Item = ({ item }) => {
  const navigate = useNavigate();
  const [deleteItem] = useDeleteItemMutation();
  const deleteItemClick = async (id) => {
    try {
      await deleteItem(id).unwrap();
      setOpen(false);
      navigate('/items');
    } catch (err) {
      // keep dialog open on failure
    }
  };

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
      <ListItem
        key={item.id}
        disablePadding
        secondaryAction={renderAdmin(item)}
        slots={{ secondaryAction: StyledSecondaryAction }}
      >
        <StyledListItem
          disableGutters
          onClick={() => navigate(`/item/${item.id}`)}
        >
          <StyledAvatar>
            <Avatar>
              <Build />
            </Avatar>
          </StyledAvatar>
          <StyledListText primary={item.name} />
        </StyledListItem>
      </ListItem>
      <StyledDivider />
    </ListItemGrid>
  )
}

export default Item