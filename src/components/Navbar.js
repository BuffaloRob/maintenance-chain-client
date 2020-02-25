// src/components/NavBar.js

import React from "react";
import { useAuth0 } from "../react-auth0-wrapper";
import { AppBar, Toolbar, Container } from "@material-ui/core";

const NavBar = () => {
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();
  debugger
  return (
    <AppBar position="static">
      <Toolbar>
        <Container>
          {!isAuthenticated && (
            <button
              onClick={() =>
                loginWithRedirect({})
              }
            >
              Log in
        </button>
          )}

          {isAuthenticated && <button onClick={() => logout()}>Log out</button>}
        </Container>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;