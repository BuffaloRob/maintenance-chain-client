import React from 'react';
import { Link as RouterLink } from 'react-router';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Panel, { PanelEmpty } from '../common/Panel';
import { StatusDot } from '../common/Status';
import { dueText } from '../../store/api/dueStatus';

// Categories (from categoryStatuses) linking to their logs, most urgent first
const DuePanel = ({ title, statuses, empty, limit = 6 }) => (
  <Panel title={title}>
    {statuses.length === 0 ? (
      <PanelEmpty>{empty}</PanelEmpty>
    ) : (
      <List dense disablePadding>
        {statuses.slice(0, limit).map(({ item, category, log, status }) => (
          <ListItem key={category.id} disablePadding>
            <ListItemButton
              component={RouterLink}
              to={`/item/${item.id}/category/${category.id}`}
              sx={{ gap: 1.5, mx: -1, px: 1, borderRadius: 2 }}
            >
              <StatusDot status={status} />
              <ListItemText
                primary={category.name}
                secondary={`${item.name} · ${dueText(log)}`}
                slotProps={{
                  primary: { sx: { m: 0, fontWeight: 500 } },
                  secondary: { sx: { m: 0, color: 'grey.400' } },
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    )}
    {statuses.length > limit && <PanelEmpty>and {statuses.length - limit} more</PanelEmpty>}
  </Panel>
);

export default DuePanel;
