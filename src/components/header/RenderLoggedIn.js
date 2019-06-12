import React from 'react'
import { Link as RouterLink } from 'react-router-dom';
import { AppBar, Toolbar, Container, IconButton, Drawer, List, ListItem } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button'
import MediaQuery from 'react-responsive';
import MenuIcon from '@material-ui/icons/Menu';


const RenderLoggedIn = ({ currentUser, handleLogout }) => {
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
        <ListItem button component={RouterLink} to="/items">
          Items
        </ListItem>
        <ListItem button component={RouterLink} to="/">
          Home
        </ListItem>
        <ListItem button component={RouterLink} to="/pastdue">
          Past Due
        </ListItem>
        <ListItem button component={RouterLink} to="/upcoming">
          Upcoming
        </ListItem>
        <ListItem button onClick={e => handleLogout(e)}>
          Log Out
        </ListItem>
      </List>
    </div>
  )

  return (
    <AppBar position="static">
      <Toolbar>
        <Container >
          {/* <MediaQuery minDeviceWidth={500}>
            <Button component={RouterLink} to="/items" color="inherit">
              Items
            </Button> */}
            {/* <Button component={RouterLink} to="/" color="inherit">
              Home
            </Button>
            <Button component={RouterLink} to="/pastdue" color="inherit">
              Past Due
            </Button>
            <Button component={RouterLink} to="/upcoming" color="inherit">
              Upcoming
            </Button> */}
            {/* <Button onClick={e => handleLogout(e)} color="inherit">
              Log Out
            </Button>
          </MediaQuery> */}
          {/* <MediaQuery maxDeviceWidth={499}> */}
            <IconButton edge="start" onClick={toggleDrawer('left', true)}>
              <MenuIcon />
            </IconButton>
            <Drawer open={state.left} onClose={toggleDrawer('left', false)}>
              {sideList('left')}
            </Drawer>
          {/* </MediaQuery> */}
        </Container >
        <Container align="right">
          <Typography variant='body1' noWrap>
            Welcome {currentUser.email}
          </Typography>
        </Container>
      </Toolbar>
    </AppBar>
  );

}

export default RenderLoggedIn