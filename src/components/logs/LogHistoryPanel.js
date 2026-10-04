import React from 'react';
import { Link as RouterLink } from 'react-router';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import Panel from '../common/Panel';
import { byRecentlyPerformed, costOf, formatDate, formatMoney } from '../../store/api/dueStatus';

// Every log of the shown log's category, with the shown one selected
const LogHistoryPanel = ({ item, category, log }) => {
  const logs = item.logs.filter(l => l.category_id === log.category_id).sort(byRecentlyPerformed);

  return (
    <Panel title={category ? `${category.name} history` : 'History'}>
      <List dense disablePadding>
        {logs.map(l => (
          <ListItem key={l.id} disablePadding>
            <ListItemButton
              component={RouterLink}
              to={`/log/${l.id}`}
              selected={l.id === log.id}
              sx={{ mx: -1, px: 1, borderRadius: 2 }}
            >
              <ListItemText
                primary={formatDate(l.date_performed)}
                slotProps={{ primary: { sx: { m: 0, fontWeight: 500 } } }}
              />
              {costOf(l) > 0 && (
                <Typography component="span" sx={{ m: 0, color: 'grey.300' }}>{formatMoney(costOf(l))}</Typography>
              )}
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Panel>
  );
};

export default LogHistoryPanel;
