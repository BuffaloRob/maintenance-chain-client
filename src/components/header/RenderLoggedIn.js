import React from 'react'
import { Link as RouterLink, useLocation } from 'react-router';
import Typography from '@mui/material/Typography';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import Toolbar from '@mui/material/Toolbar';
import MenuIcon from '@mui/icons-material/Menu';
import Grid from '@mui/material/Grid';
import Tooltip from '@mui/material/Tooltip';
import HomeIcon from '@mui/icons-material/Home';
import EventIcon from '@mui/icons-material/Event';
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { StyledDrawer, NavButton, Brand, MenuBadge } from './styles';
import { useDueCounts } from '../../store/api/lookups';

import MediaQuery from 'react-responsive';
import ListItemButton from "@mui/material/ListItemButton";

// How many categories a nav link's page lists, colored by their status.
// large is for the phone drawer's bigger text.
const NavCount = ({ status, large, children }) => (
  <Box
    component="span"
    sx={{
      ml: large ? 1.5 : 1,
      px: 0.875,
      minWidth: large ? 30 : 22,
      borderRadius: large ? 15 : 11,
      bgcolor: 'background.default',
      color: `status.${status}`,
      fontSize: large ? 16 : 12,
      fontWeight: 700,
      lineHeight: large ? '30px' : '22px',
      textAlign: 'center',
    }}
  >
    {children}
  </Box>
);

const RenderLoggedIn = ({ currentUser, handleLogout }) => {
  //taken from example https://material-ui.com/components/drawers/
  const [state, setState] = React.useState({ left: false });
  const userName = currentUser.email.split("@")[0];
  const { pathname } = useLocation();
  // false rather than missing: the Rails API doesn't send email_verified
  const { overdueCount, soonCount } = useDueCounts({ skip: currentUser.email_verified === false });

  const toggleDrawer = (side, open) => event => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [side]: open });
  };

  const sideList = side => (
    <div
      role="presentation"
      onClick={toggleDrawer(side, false)}
      onKeyDown={toggleDrawer(side, false)}
    >
      <List>
        <ListItemButton component={RouterLink} to="/items">
          Items
        </ListItemButton>
        <ListItemButton component={RouterLink} to="/upcoming">
          <span>Upcoming</span>
          {soonCount > 0 && <NavCount status="soon" large>{soonCount}</NavCount>}
        </ListItemButton>
        <ListItemButton component={RouterLink} to="/pastdue">
          <span>Past Due</span>
          {overdueCount > 0 && <NavCount status="overdue" large>{overdueCount}</NavCount>}
        </ListItemButton>
        <ListItemButton component={RouterLink} to="/">
          Welcome
        </ListItemButton>
        <ListItemButton onClick={e => handleLogout(e)}>
          Log Out
        </ListItemButton>
      </List>
    </div>
  )

  const navLink = (to, label, icon, active, count, countStatus) => (
    <NavButton
      component={RouterLink}
      to={to}
      startIcon={icon}
      aria-current={active ? 'page' : undefined}
    >
      {label}
      {count > 0 && <> <NavCount status={countStatus}>{count}</NavCount></>}
    </NavButton>
  );

  return (
    <AppBar position="sticky" style={{ borderBottomLeftRadius: '8px', borderBottomRightRadius: '8px' }} >
      <Toolbar>
        <MediaQuery minWidth={700}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, flexShrink: 0 }}>
            <Brand component={RouterLink} to="/" variant="h6" noWrap>
              Maintenance Chain
            </Brand>
            {navLink('/items', 'Items', <HomeIcon />, pathname.startsWith('/item') || pathname.startsWith('/log'))}
            {navLink('/upcoming', 'Upcoming', <EventIcon />, pathname === '/upcoming', soonCount, 'soon')}
            {navLink('/pastdue', 'Past Due', <AccessAlarmIcon />, pathname === '/pastdue', overdueCount, 'overdue')}
          </Box>
        </MediaQuery>
        <MediaQuery maxWidth={699}>
          <Grid container>
            <IconButton
              edge="start"
              onClick={toggleDrawer('left', true)}
              aria-label="Menu Button"
              size="large">
              <MenuBadge badgeContent={overdueCount} invisible={!overdueCount}>
                <MenuIcon style={{ fill: '#000000de' }} />
              </MenuBadge>
            </IconButton>
            <StyledDrawer
              open={state.left}
              onClose={toggleDrawer('left', false)}
            >
              {sideList('left')}
            </StyledDrawer>
          </Grid >
        </MediaQuery>
        <Grid
          container
          style={{paddingLeft: "4px"}}
          sx={{
            justifyContent: "flex-end",
            alignItems: "center",
            flexWrap: "nowrap",
          }}>
          <Typography variant='h5' noWrap color="textSecondary">
            Welcome {userName}
          </Typography>
          <MediaQuery minWidth={700}>
            <Tooltip title='Log Out'>
              <IconButton aria-label='Log Out' onClick={e => handleLogout(e)} sx={{ ml: 1, color: '#000000de' }}>
                <ExitToAppIcon />
              </IconButton>
            </Tooltip>
          </MediaQuery>
        </Grid>
      </Toolbar>
    </AppBar>
  );

}

export default RenderLoggedIn
