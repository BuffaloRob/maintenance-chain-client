import React from 'react'
import { Link as RouterLink } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Toolbar from '@material-ui/core/Toolbar';
import MenuIcon from '@material-ui/icons/Menu';
import Grid from '@material-ui/core/Grid';
import Fab from '@material-ui/core/Fab';
import Tooltip from '@material-ui/core/Tooltip';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import HomeIcon from '@material-ui/icons/Home';
import AccessAlarmIcon from '@material-ui/icons/AccessAlarm';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { StyledDrawer, StyledNavButton } from './styles';

import Button from '@material-ui/core/Button';
import MediaQuery from 'react-responsive';

import { useAuth0 } from "../../react-auth0-spa";
import PrivateRoute from '../PrivateRoute';


const RenderLoggedIn = ({ currentUser, handleLogout }) => {
  const { isAuthenticated, user, logout, loading, loginWithRedirect } = useAuth0();
  //taken from example https://material-ui.com/components/drawers/
  const [state, setState] = React.useState({ left: false });
  // const userName = currentUser.email.split("@")[0];

  // Need to use conditional here otherwise an error is thrown
  // on initial render because the user object is undefined
  const renderWelcome = () => {
    if(loading || !user) {
      return (
        <Typography variant='h5' noWrap color="textSecondary">
          ...Loading
        </Typography>
      )
    } else {
      return (
        <Typography variant='h5' noWrap color="textSecondary">
          Welcome {user.nickname}
        </Typography>
      )
    }
  }

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
        <ListItem button component={RouterLink} to="/items">
          Items
        </ListItem>
        <ListItem button component={RouterLink} to="/upcoming">
          Upcoming
        </ListItem>
        <ListItem button component={RouterLink} to="/pastdue">
          Past Due
        </ListItem>
        <ListItem button component={RouterLink} to="/">
          Welcome
        </ListItem>
        <ListItem button onClick={e => handleLogout(e)}>
          Log Out
        </ListItem>
      </List>
    </div>
  )

  return (
    <AppBar position="sticky" style={{ borderBottomLeftRadius: '8px', borderBottomRightRadius: '8px' }} >
      <Toolbar>
        <Grid container>
          <MediaQuery minDeviceWidth={700}>
            <Grid 
              container 
              justify='flex-start' 
              alignItems='center'
            >
              <Grid item xs={3}>
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
              <Grid item xs={3}>
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
              <Grid item xs={3}>
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
              <Grid item xs={3}>
                {isAuthenticated && <button onClick={() => logout()}>Log out</button>}
                {isAuthenticated && (
                  <span>
                    <RouterLink to="/">Home</RouterLink>&nbsp;
                    <RouterLink to="/profile">Profile</RouterLink>
                </span>
                )}
                {/* <Fab
                  color='primary'
                  aria-label='Log Out'
                  size='small'
                  onClick={e => handleLogout(e)}
                >
                  <Tooltip title='Log Out'>
                    <ExitToAppIcon />
                  </Tooltip>
                </Fab> */}
              </Grid>
            </Grid>
          </MediaQuery>
          <MediaQuery maxDeviceWidth={699}>
          <IconButton 
            edge="start" 
            onClick={toggleDrawer('left', true)} 
            aria-label="Menu Button"
          >
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
          justify="flex-end" 
          style={{paddingLeft: "4px"}}
        >
          {renderWelcome()}
        </Grid>
      </Toolbar>
    </AppBar>
  );

}

export default RenderLoggedIn