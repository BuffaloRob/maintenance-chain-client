import React from 'react';
import { Link as RouterLink, useNavigate } from 'react-router';
import Avatar from '@mui/material/Avatar'
import Icon from '@mui/material/Icon'
import Fab from '@mui/material/Fab'
import ArchiveIcon from '@mui/icons-material/Archive';
import Build from '@mui/icons-material/Build';
import DeleteIcon from '@mui/icons-material/Delete';
import UnarchiveIcon from '@mui/icons-material/Unarchive';
import Tooltip from '@mui/material/Tooltip';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import List from '@mui/material/List';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import { useArchiveItemMutation, useDeleteItemMutation, useUnarchiveItemMutation } from '../../store/api/maintenanceApi';
import { errorMessage } from '../../store/api/errorMessage';
import { categoryStatuses, dueText, formatDate, formatMoney, isArchived, mostUrgentFirst, totalCost, worstStatus } from '../../store/api/dueStatus';
import { StatusAvatar, StatusDot, StatusText } from '../common/Status';
import ConfirmDialog from '../common/ConfirmDialog';
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
  const archived = isArchived(item);
  const [deleteItem, deleting] = useDeleteItemMutation();
  const [archiveItem, archiving] = useArchiveItemMutation();
  const [unarchiveItem, restoring] = useUnarchiveItemMutation();

  // The confirmation dialog that's open: 'delete', 'archive' or null
  const [confirming, setConfirming] = React.useState(null);
  const openDialog = (action, mutation) => () => {
    mutation.reset();
    setConfirming(action);
  };
  const handleDeleteClick = openDialog('delete', deleting);
  const handleArchiveClick = openDialog('archive', archiving);
  const handleClose = () => {
    setConfirming(null);
  }
  const confirm = async mutate => {
    try {
      await mutate(item.id).unwrap();
      setConfirming(null);
    } catch (err) {
      // keep the dialog open; the error is shown in it
    }
  };
  // Restoring is as easy to undo as archiving, so it doesn't ask first. A
  // failure is shown in the row.
  const restore = () => unarchiveItem(item.id);

  const renderAdmin = (item) => (
    <ButtonGrid>
      {archived ? (
        <Fab
          color="secondary"
          size="small"
          aria-label="Restore"
          onClick={restore}
          disabled={restoring.isLoading}
        >
          <Tooltip title="Restore" placement="top">
            <UnarchiveIcon />
          </Tooltip>
        </Fab>
      ) : (
        <>
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
          <Fab
            color="secondary"
            size="small"
            aria-label="Archive"
            onClick={handleArchiveClick}
          >
            <Tooltip title="Archive" placement="top">
              <ArchiveIcon />
            </Tooltip>
          </Fab>
        </>
      )}
      <DeleteFab
        size="small"
        aria-label="Delete"
        onClick={handleDeleteClick}
      >
        <Tooltip title="Delete" placement="top">
          <DeleteIcon />
        </Tooltip>
      </DeleteFab>

      <ConfirmDialog
        open={confirming === 'delete'}
        title={`Are you sure you want to delete ${item.name}?`}
        text="You will lose all records associated with this item."
        confirmLabel="Delete"
        error={deleting.error}
        busy={deleting.isLoading}
        onConfirm={() => confirm(deleteItem)}
        onClose={handleClose}
      />
      <ConfirmDialog
        open={confirming === 'archive'}
        title={`Archive ${item.name}?`}
        text="It moves to the Archive with all of its records, and its maintenance stops showing in Upcoming and Past Due. You can restore it from the Archive."
        confirmLabel="Archive"
        error={archiving.error}
        busy={archiving.isLoading}
        onConfirm={() => confirm(archiveItem)}
        onClose={handleClose}
      />
    </ButtonGrid>
  );

  if (variant === 'card') {
    return <ItemCard item={item} admin={renderAdmin(item)} />;
  }

  // The row (narrow screens) says only what needs attention, e.g. "2 overdue · 1 due soon",
  // or when an archived item was archived
  const renderSecondary = () => {
    if (restoring.error) {
      return (
        <Box component="span" role="alert" sx={{ color: 'error.main' }}>
          Couldn't restore it: {errorMessage(restoring.error)}
        </Box>
      );
    }
    if (archived) return `Archived ${formatDate(item.archived_at)}`;

    const statuses = categoryStatuses(item);
    const attention = ['overdue', 'soon']
      .map(status => [status, statuses.filter(s => s.status === status).length])
      .filter(([, count]) => count > 0)
      .map(([status, count]) => (
        <StatusText key={status} status={status}>{count} {status === 'soon' ? 'due soon' : 'overdue'}</StatusText>
      ));
    return attention.length > 0 ? attention.flatMap((el, i) => (i ? [' · ', el] : [el])) : null;
  };

  return (
    <ListItemGrid>
      <ListItem
        key={item.id}
        disablePadding
        secondaryAction={
          <>
            {renderAdmin(item)}
            {archived ? (
              <RowActionsMenu actions={[{ label: 'Restore', onClick: restore }]} onDelete={handleDeleteClick} />
            ) : (
              <RowActionsMenu
                editTo={`/item/${item.id}/edit`}
                actions={[{ label: 'Archive', onClick: handleArchiveClick }]}
                onDelete={handleDeleteClick}
              />
            )}
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
            secondary={renderSecondary()}
          />
        </StyledListItem>
      </ListItem>
      <StyledDivider />
    </ListItemGrid>
  )
}

export default Item