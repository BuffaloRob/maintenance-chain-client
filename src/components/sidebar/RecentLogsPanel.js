import React from 'react';
import { Link as RouterLink } from 'react-router';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import Panel, { PanelEmpty } from '../common/Panel';
import { byRecentlyPerformed, costOf, formatDate, formatMoney } from '../../store/api/dueStatus';

// The latest logs across the given items, linking to each log
const RecentLogsPanel = ({ title = 'Recent activity', items, showItem = true, limit = 5 }) => {
  const recent = items
    .flatMap(item =>
      item.logs.map(log => ({ item, log, category: item.categories.find(c => c.id === log.category_id) }))
    )
    .sort((a, b) => byRecentlyPerformed(a.log, b.log))
    .slice(0, limit);

  return (
    <Panel title={title}>
      {recent.length === 0 ? (
        <PanelEmpty>Nothing logged yet.</PanelEmpty>
      ) : (
        <List dense disablePadding>
          {recent.map(({ item, log, category }) => (
            <ListItem key={log.id} disablePadding>
              <ListItemButton
                component={RouterLink}
                to={`/log/${log.id}`}
                sx={{ gap: 1.5, mx: -1, px: 1, borderRadius: 2 }}
              >
                <ListItemText
                  primary={category ? category.name : 'Log'}
                  secondary={showItem ? `${item.name} · ${formatDate(log.date_performed)}` : formatDate(log.date_performed)}
                  slotProps={{
                    primary: { sx: { m: 0, fontWeight: 500 } },
                    secondary: { sx: { m: 0, color: 'grey.400' } },
                  }}
                />
                {costOf(log) > 0 && (
                  <Typography component="span" sx={{ m: 0, color: 'grey.300' }}>
                    {formatMoney(costOf(log))}
                  </Typography>
                )}
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      )}
    </Panel>
  );
};

export default RecentLogsPanel;
