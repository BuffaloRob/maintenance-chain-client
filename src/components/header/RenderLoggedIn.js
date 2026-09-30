import React from 'react'
import { Link as RouterLink } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import AppBar from '@mui/material/AppBar';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import Toolbar from '@mui/material/Toolbar';
import MenuIcon from '@mui/icons-material/Menu';
import Grid from '@mui/material/Grid';
import Fab from '@mui/material/Fab';
import Tooltip from '@mui/material/Tooltip';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import HomeIcon from '@mui/icons-material/Home';
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { StyledDrawer, StyledNavButton } from './styles';
import Button from '@mui/material/Button';

import MediaQuery from 'react-responsive';
import ListItemButton from "@mui/material/ListItemButton";


const RenderLoggedIn = ({ currentUser, handleLogout }) => {
  //taken from example https://material-ui.com/components/drawers/
  const [state, setState] = React.useState({ left: false });
  const userName = currentUser.email.split("@")[0];

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
          Upcoming
        </ListItemButton>
        <ListItemButton component={RouterLink} to="/pastdue">
          Past Due
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

  return (
    <AppBar position="sticky" style={{ borderBottomLeftRadius: '8px', borderBottomRightRadius: '8px' }} >
      <Toolbar>
        <Grid container>
          <MediaQuery minWidth={700}>
            <Grid
              container
              sx={{
                justifyContent: 'flex-start',
                alignItems: 'center'
              }}>
              <Grid size={3}>
                <Fab
                  color='primary'
                  aria-label='Home'
                  size='small'
                  to="/items"
                  component={RouterLink}
                >
                  <Tooltip title='Items'>
                    <HomeIcon />
                  </Tooltip>
                </Fab>
              </Grid>
              <Grid size={3}>
                <Fab
                  color='primary'
                  aria-label='Upcoming'
                  size='small'
                  to="/upcoming"
                  component={RouterLink}
                >
                  <Tooltip title='Upcoming'>
                    <ArrowUpwardIcon />
                  </Tooltip>
                </Fab>
              </Grid>
              <Grid size={3}>
                <Fab
                  color='primary'
                  aria-label='Past Due'
                  size='small'
                  to="/pastdue"
                  component={RouterLink}
                >
                  <Tooltip title='Past Due'>
                    <AccessAlarmIcon />
                  </Tooltip>
                </Fab>
              </Grid>
              <Grid size={3}>
                <Fab
                  color='primary'
                  aria-label='Log Out'
                  size='small'
                  onClick={e => handleLogout(e)}
                >
                  <Tooltip title='Log Out'>
                    <ExitToAppIcon />
                  </Tooltip>
                </Fab>
              </Grid>
            </Grid>
          </MediaQuery>
          <MediaQuery maxWidth={699}>
          <IconButton
            edge="start"
            onClick={toggleDrawer('left', true)}
            aria-label="Menu Button"
            size="large">
            <MenuIcon style={{ fill: '#000000de' }} />
          </IconButton>
          <StyledDrawer 
            open={state.left} 
            onClose={toggleDrawer('left', false)}
          >
            {sideList('left')}
          </StyledDrawer>
          </MediaQuery>
        </Grid >
        <Grid
          container
          style={{paddingLeft: "4px"}}
          sx={{
            justifyContent: "flex-end"
          }}>
          <Typography variant='h5' noWrap color="textSecondary">
            Welcome {userName}
          </Typography>
        </Grid>
      </Toolbar>
    </AppBar>
  );

}

export default RenderLoggedIn