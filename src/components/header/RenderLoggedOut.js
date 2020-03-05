import React from 'react'
import { Link as RouterLink } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Container from '@material-ui/core/Container';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import IconButton from '@material-ui/core/IconButton';
import Toolbar from '@material-ui/core/Toolbar';
import MediaQuery from 'react-responsive';
import MenuIcon from '@material-ui/icons/Menu';
import { StyledNavButton, StyledMessage, StyledDrawer } from './styles';

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
          <MediaQuery minDeviceWidth={690}>
            <StyledNavButton
              component={RouterLink}
              to="/login"
              color="primary"
              variant="contained"
            >
              Log In
            </StyledNavButton>
            <StyledNavButton
              component={RouterLink}
              to="/signup"
              color="primary"
              variant="contained"
            >
              Sign Up
            </StyledNavButton>
          </MediaQuery>
          <MediaQuery maxDeviceWidth={689}>
            <IconButton 
              edge="start" 
              onClick={toggleDrawer('left', true)} 
              aria-label="Menu Button"
            >
              <MenuIcon style={{ fill: '#000000de' }}/>
            </IconButton>
            <StyledDrawer open={state.left} onClose={toggleDrawer('left', false)}>
              {sideList('left')}
            </StyledDrawer>
          </MediaQuery>
        </Container>
        <Container align="right">
          <StyledMessage noWrap>
            Please Login
          </StyledMessage>
        </Container>
      </Toolbar>
    </AppBar>
  );
}

export default RenderLoggedOut;