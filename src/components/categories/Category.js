import React from 'react';
import Icon from '@material-ui/core/Icon'
import Fab from '@material-ui/core/Fab'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import Build from '@material-ui/icons/Build';
import DeleteIcon from '@material-ui/icons/Delete';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Tooltip from '@material-ui/core/Tooltip';
import { StyledListItem, StyledSecondaryAction, StyledAvatar, StyledDivider, DeleteFab, StyledListText, ListItemGrid, ButtonGrid } from './styles';

const Category = ({ category, selectCategory, match, itemId, editCategoryClick, deleteCategoryClick }) => {

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
        onClick={() => editCategoryClick(category.id, itemId)}
      >
        <Tooltip title="edit">
          <Icon>edit_icon</Icon>
        </Tooltip>
      </Fab>
      <DeleteFab
        color="primary"
        size="small"
        aria-label="Delete"
        onClick={handleClickOpen}
      >
        <DeleteIcon />
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
          <Button onClick={() => deleteCategoryClick(category.id, itemId)} color="primary" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>

    </ButtonGrid>
  );

  return (
    <ListItemGrid>
      <StyledListItem 
        key={category.id} 
        button 
        disableGutters
        onClick={() => selectCategory(category.id, itemId)}
      >
        <StyledAvatar>
          <Avatar>
            <Build />
          </Avatar>
        </StyledAvatar>
        <StyledListText primary={category.name} />
        <StyledSecondaryAction>
          {renderAdmin(category)}
        </StyledSecondaryAction>
      </StyledListItem>
      <StyledDivider />
    </ListItemGrid>
  )
}

export default Category