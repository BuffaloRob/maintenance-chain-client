import React from 'react';
import moment from 'moment';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { allCategoryStatuses, formatMoney, totalCost } from '../../store/api/dueStatus';

const StatTile = ({ value, label, status }) => (
  <Paper variant="outlined" sx={{ bgcolor: 'background.card', borderRadius: 3, px: 2.5, py: 2 }}>
    <Typography sx={{ m: 0, fontSize: 32, fontWeight: 500, lineHeight: 1.25, color: status ? `status.${status}` : 'common.white' }}>
      {value}
    </Typography>
    <Typography sx={{ m: 0, color: 'grey.400' }}>{label}</Typography>
  </Paper>
);

// Totals across all items, shown above the item cards
const ItemStats = ({ items }) => {
  const statuses = allCategoryStatuses(items);
  const overdue = statuses.filter(s => s.status === 'overdue').length;
  const soon = statuses.filter(s => s.status === 'soon').length;
  const year = moment().year();
  const spent = totalCost(items.flatMap(item => item.logs).filter(log => moment(log.date_performed).year() === year));

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(4, minmax(0, 1fr))', gap: 2.5, mb: 4 }}>
      <StatTile value={items.length} label={items.length === 1 ? 'Item tracked' : 'Items tracked'} />
      <StatTile value={overdue} label="Overdue" status={overdue ? 'overdue' : null} />
      <StatTile value={soon} label="Due in 30 days" status={soon ? 'soon' : null} />
      <StatTile value={formatMoney(spent)} label={`Spent in ${year}`} />
    </Box>
  );
};

export default ItemStats;
