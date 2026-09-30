import React from 'react';
import { Link as RouterLink, useNavigate } from 'react-router';
import Icon from '@mui/material/Icon'
import Fab from '@mui/material/Fab'
import Avatar from '@mui/material/Avatar'
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
import { useDeleteCategoryMutation } from '../../store/api/maintenanceApi';
import { StyledListItem, StyledSecondaryAction, StyledAvatar, StyledDivider, DeleteFab, StyledListText, ListItemGrid, ButtonGrid } from './styles';

const Category = ({ category, itemId }) => {
  const navigate = useNavigate();
  const [deleteCategory] = useDeleteCategoryMutation();
  const deleteCategoryClick = async (id) => {
    try {
      await deleteCategory({ id, itemId }).unwrap();
      setOpen(false);
      navigate(`/item/${itemId}`);
    } catch (err) {
      // keep dialog open on failure
    }
  };

  //Used in delete dialog pop up
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  }
  const handleClose = () => {
    setOpen(false);
  }

  const renderAdmin = category => (
    <ButtonGrid >
      <Fab
        color="secondary"
        size="small"
        aria-label="Edit"
        component={RouterLink}
        to={`/item/${itemId}/category/${category.id}/edit`}
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
        <DialogTitle id="alert-dialog-title">{`Are you sure you want to delete ${category.name}?`}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            You will lose all records associated with this category.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={() => deleteCategoryClick(category.id)} color="primary" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>

    </ButtonGrid>
  );

  return (
    <ListItemGrid>
      <ListItem
        key={category.id}
        disablePadding
        secondaryAction={renderAdmin(category)}
        slots={{ secondaryAction: StyledSecondaryAction }}
      >
        <StyledListItem
          disableGutters
          onClick={() => navigate(`/item/${itemId}/category/${category.id}`)}
        >
          <StyledAvatar>
            <Avatar>
              <Build />
            </Avatar>
          </StyledAvatar>
          <StyledListText primary={category.name} />
        </StyledListItem>
      </ListItem>
      <StyledDivider />
    </ListItemGrid>
  )
}

export default Category