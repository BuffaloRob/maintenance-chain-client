import React from 'react';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Build from '@mui/icons-material/Build';
import { alpha } from '@mui/material/styles';

const LABELS = { overdue: 'Overdue', soon: 'Due soon', ok: 'On track', none: 'No logs yet' };

export const StatusChip = ({ status }) => (
  <Chip
    component="span"
    size="small"
    label={LABELS[status]}
    sx={theme => ({
      height: 22,
      fontWeight: 500,
      color: theme.palette.status[status],
      bgcolor: alpha(theme.palette.status[status], 0.15),
    })}
  />
);

// Text in its status color when it needs attention, muted otherwise
export const StatusText = ({ status, children }) => (
  <Box
    component="span"
    sx={{ color: status === 'overdue' || status === 'soon' ? `status.${status}` : 'grey.400' }}
  >
    {children}
  </Box>
);

export const StatusDot = ({ status }) => (
  <Box
    component="span"
    sx={{ width: 10, height: 10, borderRadius: '50%', flexShrink: 0, bgcolor: `status.${status}` }}
  />
);

// The wrench avatar, tinted with a status color
export const StatusAvatar = ({ status }) => (
  <Avatar
    sx={theme => ({
      color: theme.palette.status[status],
      bgcolor: alpha(theme.palette.status[status], 0.15),
    })}
  >
    <Build />
  </Avatar>
);
