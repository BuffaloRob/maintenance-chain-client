import React from 'react'
import { Link as RouterLink } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import List from '@mui/material/List';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import MediaQuery from 'react-responsive';
import MenuIcon from '@mui/icons-material/Menu';
import { StyledNavButton, StyledDrawer, LogInButton, LeftNavContainer } from './styles';
import ListItemButton from "@mui/material/ListItemButton";

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
        <ListItemButton component={RouterLink} to="/login">
          Log In
        </ListItemButton>
        <ListItemButton component={RouterLink} to="/signup">
          Sign Up
        </ListItemButton>
      </List>
    </div>
  )

  return (
    <AppBar position="sticky" style={{ borderBottomLeftRadius: '8px', borderBottomRightRadius: '8px' }} >
      <Toolbar >
        <LeftNavContainer>
          <MediaQuery minWidth={690}>
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
          <MediaQuery maxWidth={689}>
            <IconButton
              edge="start"
              onClick={toggleDrawer('left', true)}
              aria-label="Menu Button"
              size="large">
              <MenuIcon style={{ fill: '#000000de' }}/>
            </IconButton>
            <StyledDrawer open={state.left} onClose={toggleDrawer('left', false)}>
              {sideList('left')}
            </StyledDrawer>
          </MediaQuery>
        </LeftNavContainer>
        <Container align="right">
          <LogInButton
            component={RouterLink}
            to="/login"
            color="primary"
            variant="contained"
          >
            Please Log In
            </LogInButton>
        </Container>
      </Toolbar>
    </AppBar>
  );
}

export default RenderLoggedOut;