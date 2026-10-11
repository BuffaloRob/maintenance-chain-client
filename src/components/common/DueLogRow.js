import React from 'react';
import { Link as RouterLink, useNavigate } from 'react-router';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import AddIcon from '@mui/icons-material/Add';
import { StatusAvatar } from './Status';
import { fromToday, statusOf } from '../../store/api/dueStatus';

// A Past Due / Upcoming row from sm up: adds the item the log belongs to, how
// far off the due date is, and a shortcut to log the work once it's done.
// log: a /past_due or /upcoming log, which carries its category.
const DueLogRow = ({ log, text, itemName }) => {
  const navigate = useNavigate();
  const { category } = log;

  return (
    <ListItem
      disablePadding
      divider
      secondaryAction={
        <Button
          component={RouterLink}
          to={`/item/${category.item_id}/category/${category.id}/log/new`}
          variant="outlined"
          size="small"
          startIcon={<AddIcon />}
        >
          Log it
        </Button>
      }
    >
      <ListItemButton onClick={() => navigate(`/log/${log.id}`)} sx={{ gap: 2, py: 3, pl: 3, pr: 16 }}>
        <StatusAvatar status={statusOf(log)} />
        <ListItemText
          primary={text}
          secondary={[itemName, fromToday(log.date_due)].filter(Boolean).join(' · ')}
          slotProps={{
            primary: { sx: { m: 0, fontSize: 22, fontWeight: 500, color: 'primary.main' } },
            secondary: { sx: { m: 0, mt: 0.5, color: 'grey.400' } },
          }}
        />
      </ListItemButton>
    </ListItem>
  );
};

// The narrow-screen row's text: the sentence, with the item and how far off
// the due date is underneath
export const DueLogText = ({ log, text, itemName }) => (
  <Box component="span" sx={{ display: 'block' }}>
    <span>{text}</span>
    <Box component="span" sx={{ display: 'block', mt: 0.5, fontSize: 14, fontWeight: 400, color: 'grey.400' }}>
      {[itemName, fromToday(log.date_due)].filter(Boolean).join(' · ')}
    </Box>
  </Box>
);

export default DueLogRow;
