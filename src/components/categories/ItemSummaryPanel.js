import React from 'react';
import moment from 'moment';
import Panel, { PanelRow } from '../common/Panel';
import {
  byRecentlyPerformed, categoryStatuses, formatDate, formatMoney, totalCost,
} from '../../store/api/dueStatus';

// Totals for one item, beside its categories
const ItemSummaryPanel = ({ item }) => {
  const statuses = categoryStatuses(item);
  const count = status => statuses.filter(s => s.status === status).length;
  const year = moment().year();
  const lastLog = [...item.logs].sort(byRecentlyPerformed)[0];

  return (
    <Panel title="Summary">
      <PanelRow label="Overdue">{count('overdue')}</PanelRow>
      <PanelRow label="Due in 30 days">{count('soon')}</PanelRow>
      <PanelRow label="Logs">{item.logs.length}</PanelRow>
      <PanelRow label={`Spent in ${year}`}>
        {formatMoney(totalCost(item.logs.filter(log => moment(log.date_performed).year() === year)))}
      </PanelRow>
      <PanelRow label="Spent in total">{formatMoney(totalCost(item.logs))}</PanelRow>
      {lastLog && <PanelRow label="Last service">{formatDate(lastLog.date_performed)}</PanelRow>}
    </Panel>
  );
};

export default ItemSummaryPanel;
