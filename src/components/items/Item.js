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
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import List from '@mui/material/List';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import { useDeleteItemMutation } from '../../store/api/maintenanceApi';
import { errorMessage } from '../../store/api/errorMessage';
import { categoryStatuses, dueText, formatMoney, mostUrgentFirst, totalCost, worstStatus } from '../../store/api/dueStatus';
import { StatusAvatar, StatusDot, StatusText } from '../common/Status';
import RowActionsMenu from '../common/RowActionsMenu';
import { StyledListItem, StyledSecondaryAction, StyledAvatar, StyledDivider, DeleteFab, StyledListText, ListItemGrid, ButtonGrid, StyledCard, CardTitle, CardMeta } from './styles';

const plural = (count, one, many = `${one}s`) => `${count} ${count === 1 ? one : many}`;

// How many categories a card lists before "and N more"
const CARD_CATEGORIES = 3;

// The card shown from sm up: the item's most urgent categories at a glance
const ItemCard = ({ item, admin }) => {
  const statuses = mostUrgentFirst(categoryStatuses(item));
  const spent = totalCost(item.logs);
  const meta = [plural(item.categories.length, 'category', 'categories'), plural(item.logs.length, 'log')];
  if (spent > 0) meta.push(`${formatMoney(spent)} spent`);

  return (
    <StyledCard component="li" variant="outlined">
      <CardActionArea
        component={RouterLink}
        to={`/item/${item.id}`}
        sx={{ display: 'flex', justifyContent: 'flex-start', gap: 2, p: 2 }}
      >
        <StatusAvatar status={worstStatus(statuses)} />
        <Box sx={{ minWidth: 0 }}>
          <CardTitle>{item.name}</CardTitle>
          <CardMeta>{meta.join(' · ')}</CardMeta>
        </Box>
      </CardActionArea>
      <Divider />
      <List dense sx={{ flexGrow: 1 }}>
        {statuses.slice(0, CARD_CATEGORIES).map(({ category, log, status }) => (
          <ListItem key={category.id} disablePadding>
            <ListItemButton
              component={RouterLink}
              to={`/item/${item.id}/category/${category.id}`}
              sx={{ gap: 1.5, px: 2 }}
            >
              <StatusDot status={status} />
              <ListItemText primary={category.name} slotProps={{ primary: { sx: { m: 0 } } }} />
              <Typography component="span" sx={{ m: 0, color: 'grey.400', fontSize: 14, whiteSpace: 'nowrap' }}>
                {log ? dueText(log) : 'No logs yet'}
              </Typography>
            </ListItemButton>
          </ListItem>
        ))}
        {statuses.length === 0 && (
          <Typography sx={{ m: 0, px: 2, py: 1, color: 'grey.500' }}>No maintenance categories yet</Typography>
        )}
      </List>
      <Box sx={{ display: 'flex', alignItems: 'center', px: 1, pb: 0.5 }}>
        <Typography sx={{ m: 0, px: 1, flexGrow: 1, color: 'grey.500', fontSize: 14 }}>
          {statuses.length > CARD_CATEGORIES && `and ${statuses.length - CARD_CATEGORIES} more`}
        </Typography>
        {admin}
      </Box>
    </StyledCard>
  );
};

const Item = ({ item, variant = 'row' }) => {
  const navigate = useNavigate();
  const [deleteItem, { isLoading: isDeleting, error: deleteError, reset }] = useDeleteItemMutation();
  const deleteItemClick = async (id) => {
    try {
      await deleteItem(id).unwrap();
      setOpen(false);
    } catch (err) {
      // keep the dialog open; the error is shown in it
    }
  };

  //Used in delete dialog pop up
  const [open, setOpen] = React.useState(false);
  const handleClickOpen= () => {
    reset();
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
          {deleteError && (
            <DialogContentText color="error" role="alert">{errorMessage(deleteError)}</DialogContentText>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={() => deleteItemClick(item.id)} color="primary" disabled={isDeleting}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </ButtonGrid>

  );

  if (variant === 'card') {
    return <ItemCard item={item} admin={renderAdmin(item)} />;
  }

  // The row (narrow screens) says only what needs attention, e.g. "2 overdue · 1 due soon"
  const statuses = categoryStatuses(item);
  const attention = ['overdue', 'soon']
    .map(status => [status, statuses.filter(s => s.status === status).length])
    .filter(([, count]) => count > 0)
    .map(([status, count]) => (
      <StatusText key={status} status={status}>{count} {status === 'soon' ? 'due soon' : 'overdue'}</StatusText>
    ));

  return (
    <ListItemGrid>
      <ListItem
        key={item.id}
        disablePadding
        secondaryAction={
          <>
            {renderAdmin(item)}
            <RowActionsMenu editTo={`/item/${item.id}/edit`} onDelete={handleClickOpen} />
          </>
        }
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
          <StyledListText
            primary={item.name}
            secondary={attention.length > 0 ? attention.flatMap((el, i) => (i ? [' · ', el] : [el])) : null}
          />
        </StyledListItem>
      </ListItem>
      <StyledDivider />
    </ListItemGrid>
  )
}

export default Item