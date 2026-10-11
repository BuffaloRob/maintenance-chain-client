import React from 'react';
import moment from 'moment';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Panel, { PanelRow } from '../common/Panel';
import { costOf, dueInterval, formatDate, formatMoney, suggestedDueDate } from '../../store/api/dueStatus';

const Detail = ({ label, children }) => (
  <Box sx={{ py: 0.75 }}>
    <Typography sx={{ m: 0, color: 'grey.400' }}>{label}</Typography>
    <Typography sx={{ m: 0, whiteSpace: 'pre-line' }}>{children}</Typography>
  </Box>
);

// Beside the new log form: what was recorded the last time this was done,
// with shortcuts to reuse it. datePerformed is the form's current value.
const LastTimePanels = ({ log, datePerformed, setValue }) => {
  const interval = dueInterval(log);
  const suggestedDue = suggestedDueDate(log, datePerformed);
  const fill = (name, value) => setValue(name, value || '', { shouldDirty: true, shouldValidate: true });

  return (
    <>
      <Panel title="Last time">
        <Typography sx={{ m: 0, mb: 0.5, fontSize: 20, fontWeight: 500 }}>
          {formatDate(log.date_performed)}
        </Typography>
        {costOf(log) > 0 && <PanelRow label="Cost">{formatMoney(costOf(log))}</PanelRow>}
        {log.tools && <Detail label="Tools used">{log.tools}</Detail>}
        {log.notes && <Detail label="Notes">{log.notes}</Detail>}
        {(log.tools || log.notes) && (
          <Button
            size="small"
            sx={{ mt: 1 }}
            onClick={() => {
              fill('tools', log.tools);
              fill('notes', log.notes);
            }}
          >
            Copy tools & notes
          </Button>
        )}
      </Panel>
      {suggestedDue && (
        <Panel title="Suggested due date">
          <Typography sx={{ m: 0, color: 'grey.400' }}>
            Last time it was due {moment.duration(interval, 'days').humanize()} after it was done.
          </Typography>
          <Button variant="outlined" sx={{ mt: 1.5 }} onClick={() => fill('date_due', suggestedDue)}>
            Use {formatDate(suggestedDue)}
          </Button>
        </Panel>
      )}
    </>
  );
};

export default LastTimePanels;
