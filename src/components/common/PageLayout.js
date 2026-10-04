import React from 'react';
import Box from '@mui/material/Box';
import useMediaQuery from '@mui/material/useMediaQuery';

// Phones keep the original minimal layout. From sm up, rows show more detail;
// from md up, a sidebar of summaries sits beside the page's main column.
export const useWideLayout = () =>
  useMediaQuery(theme => theme.breakpoints.up('sm'), { noSsr: true });
export const useSidebarLayout = () =>
  useMediaQuery(theme => theme.breakpoints.up('md'), { noSsr: true });

const PageLayout = ({ title, top, aside, children }) => {
  const withSidebar = useSidebarLayout() && !!aside;
  return (
    <>
      {title}
      {top}
      <Box
        sx={withSidebar ? {
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 1fr) 320px',
          gap: 5,
          alignItems: 'start',
        } : undefined}
      >
        <Box component="main" sx={{ minWidth: 0 }}>{children}</Box>
        {withSidebar && (
          <Box component="aside" sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            {aside}
          </Box>
        )}
      </Box>
    </>
  );
};

export default PageLayout;
