import React from 'react'
import { Link as RouterLink } from 'react-router-dom';
import { AppBar, Toolbar, Container, List, ListItem, IconButton, Drawer } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button'
import MediaQuery from 'react-responsive';
import MenuIcon from '@material-ui/icons/Menu';

const RenderLoggedOut = () => {
  //taken from example https://material-ui.com/components/drawers/
  const [state, setState] = React.useState({ left: false });

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
        <ListItem button component={RouterLink} to="/login">
          Log In
        </ListItem>
        <ListItem button component={RouterLink} to="/signup">
          Sign Up
        </ListItem>
      </List>
    </div>
  )

  return (
    <AppBar position="static" >
      <Toolbar >
        <Container>
          <MediaQuery minDeviceWidth={405}>
            <Button
              component={RouterLink}
              to="/signup"
              color="inherit"
            >
              Sign Up
            </Button>
            <Button
              component={RouterLink}
              to="/login"
              color="inherit"
            >
              Log In
            </Button>
          </MediaQuery>
          <MediaQuery maxDeviceWidth={404}>
            <IconButton edge="start" onClick={toggleDrawer('left', true)}>
              <MenuIcon />
            </IconButton>
            <Drawer open={state.left} onClose={toggleDrawer('left', false)}>
              {sideList('left')}
            </Drawer>
          </MediaQuery>
        </Container>
        <Container align="right">
          <Typography variant='body1' noWrap>
            Please Login
          </Typography>
        </Container>
      </Toolbar>
    </AppBar>
  );
}

export default RenderLoggedOut;