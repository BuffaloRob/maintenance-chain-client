import React from 'react'
import { Link as RouterLink } from 'react-router-dom';

import { AppBar, Toolbar, Container } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';

const RenderLoggedIn = ({ currentUser, handleLogout }) => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Container >
          <Button component={RouterLink} to="/items" color="inherit">
            Items
          </Button>
          <Button component={RouterLink} to="/" color="inherit">
            Home
          </Button>
          <Button onClick={e => handleLogout(e)} color="inherit">
            Log Out
          </Button>
        </Container >
        <Container align="right">
          <Typography >
            Welcome {currentUser.email}
          </Typography>
        </Container>
      </Toolbar>
    </AppBar>
  );

}

export default RenderLoggedIn