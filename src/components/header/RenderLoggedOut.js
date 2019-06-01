import React from 'react'
import { Link as RouterLink } from 'react-router-dom';

import { AppBar, Toolbar, Container } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button'
import Link from '@material-ui/core/Link';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';

const RenderLoggedOut = () => {
  return (
    <AppBar position="static" >
      <Toolbar >
        <Container>
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
        </Container>
        <Container align="right">
          <Typography color="inherit">
            Please Login
          </Typography>
        </Container>
        
      </Toolbar>
    </AppBar>
  );
}

export default RenderLoggedOut;