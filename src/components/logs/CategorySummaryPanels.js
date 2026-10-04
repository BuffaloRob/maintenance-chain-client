import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Panel, { PanelEmpty, PanelRow } from '../common/Panel';
import { StatusChip } from '../common/Status';
import {
  costOf, dueText, formatDate, formatMoney, latestLog, statusOf, totalCost, typicalInterval,
} from '../../store/api/dueStatus';

// When the category is next due, and what its logs add up to
const CategorySummaryPanels = ({ item, category, logs }) => {
  const log = latestLog(item, category.id);
  const status = statusOf(log);
  const interval = typicalInterval(logs);
  const costs = logs.filter(l => costOf(l) > 0);

  return (
    <>
      <Panel title="Next due">
        {log ? (
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 2 }}>
            <Box>
              <Typography sx={{ m: 0, fontSize: 22, fontWeight: 500 }}>{formatDate(log.date_due)}</Typography>
              <Typography sx={{ m: 0, color: 'grey.400' }}>{dueText(log)}</Typography>
            </Box>
            <StatusChip status={status} />
          </Box>
        ) : (
          <PanelEmpty>Add a log to start tracking when this is due.</PanelEmpty>
        )}
      </Panel>
      {logs.length > 0 && (
        <Panel title="History">
          <PanelRow label="Times done">{logs.length}</PanelRow>
          {interval && <PanelRow label="Usually every">{interval}</PanelRow>}
          <PanelRow label="Spent in total">{formatMoney(totalCost(logs))}</PanelRow>
          {costs.length > 0 && (
            <PanelRow label="Average cost">{formatMoney(totalCost(costs) / costs.length)}</PanelRow>
          )}
        </Panel>
      )}
    </>
  );
};

export default CategorySummaryPanels;
