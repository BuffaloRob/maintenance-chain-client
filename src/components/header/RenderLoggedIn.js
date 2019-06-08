import React from 'react'
import { Link as RouterLink } from 'react-router-dom';

import { AppBar, Toolbar, Container, IconButton } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button'
import MediaQuery from 'react-responsive';
import MenuIcon from '@material-ui/icons/Menu';


const RenderLoggedIn = ({ currentUser, handleLogout }) => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Container >
          <MediaQuery minDeviceWidth={540}>
            <Button component={RouterLink} to="/items" color="inherit">
              Items
            </Button>
            <Button component={RouterLink} to="/" color="inherit">
              Home
            </Button>
            <Button onClick={e => handleLogout(e)} color="inherit">
              Log Out
            </Button>
          </MediaQuery>
          <MediaQuery maxDeviceWidth={539}>
            <IconButton edge="start" >
              <MenuIcon />
            </IconButton>
          </MediaQuery>
        </Container >
        <Container align="right">
          <Typography variant='b1' noWrap>
            Welcome {currentUser.email}
          </Typography>
        </Container>
      </Toolbar>
    </AppBar>
  );

}

export default RenderLoggedIn