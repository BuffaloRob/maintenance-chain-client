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
import { errorMessage } from '../../store/api/errorMessage';
import { dueText, formatDate, statusOf } from '../../store/api/dueStatus';
import { useWideLayout } from '../common/PageLayout';
import { StatusAvatar, StatusChip, StatusText } from '../common/Status';
import RowActionsMenu from '../common/RowActionsMenu';
import { StyledListItem, StyledSecondaryAction, StyledAvatar, StyledDivider, DeleteFab, StyledListText, ListItemGrid, ButtonGrid, NameWithStatus } from './styles';

// log: the category's latest log, which sets its due status
const Category = ({ category, itemId, log }) => {
  const navigate = useNavigate();
  const wide = useWideLayout();
  const status = statusOf(log);
  const [deleteCategory, { isLoading: isDeleting, error: deleteError, reset }] = useDeleteCategoryMutation();
  const deleteCategoryClick = async (id) => {
    try {
      await deleteCategory({ id, itemId }).unwrap();
      setOpen(false);
    } catch (err) {
      // keep the dialog open; the error is shown in it
    }
  };

  //Used in delete dialog pop up
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    reset();
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
          {deleteError && (
            <DialogContentText color="error" role="alert">{errorMessage(deleteError)}</DialogContentText>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={() => deleteCategoryClick(category.id)} color="primary" autoFocus disabled={isDeleting}>
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
        secondaryAction={
          <>
            {renderAdmin(category)}
            <RowActionsMenu editTo={`/item/${itemId}/category/${category.id}/edit`} onDelete={handleClickOpen} />
          </>
        }
        slots={{ secondaryAction: StyledSecondaryAction }}
      >
        <StyledListItem
          disableGutters
          onClick={() => navigate(`/item/${itemId}/category/${category.id}`)}
        >
          <StyledAvatar>
            {wide ? <StatusAvatar status={status} /> : (
              <Avatar>
                <Build />
              </Avatar>
            )}
          </StyledAvatar>
          {wide ? (
            <StyledListText
              primary={
                <NameWithStatus>
                  {category.name}
                  {(status === 'overdue' || status === 'soon') && <StatusChip status={status} />}
                </NameWithStatus>
              }
              secondary={log
                ? `Last done ${formatDate(log.date_performed)} · ${dueText(log)}`
                : 'No logs yet'}
            />
          ) : (
            <StyledListText
              primary={category.name}
              secondary={<StatusText status={status}>{log ? dueText(log) : 'No logs yet'}</StatusText>}
            />
          )}
        </StyledListItem>
      </ListItem>
      <StyledDivider />
    </ListItemGrid>
  )
}

export default Category