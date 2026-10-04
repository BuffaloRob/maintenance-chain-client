import React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

// A titled card, used for the sidebar on wide screens
const Panel = ({ title, children, sx }) => (
  <Paper
    variant="outlined"
    sx={{ bgcolor: 'background.card', borderRadius: 3, p: 2.5, ...sx }}
  >
    {title && (
      <Typography
        variant="overline"
        component="h3"
        sx={{ m: 0, mb: 1, display: 'block', color: 'grey.400', letterSpacing: '0.12em' }}
      >
        {title}
      </Typography>
    )}
    {children}
  </Paper>
);

// A label on the left and its value on the right
export const PanelRow = ({ label, children }) => (
  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 2, py: 0.75 }}>
    <Typography component="span" sx={{ m: 0, color: 'grey.400' }}>{label}</Typography>
    <Typography component="span" sx={{ m: 0, fontWeight: 500, textAlign: 'right' }}>{children}</Typography>
  </Box>
);

// Shown in a panel that has nothing to list
export const PanelEmpty = ({ children }) => (
  <Typography sx={{ m: 0, py: 1, color: 'grey.500' }}>{children}</Typography>
);

export default Panel;
