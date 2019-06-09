import React from 'react';
import { connect } from 'react-redux';
import { Router, Route, Switch, withRouter } from 'react-router-dom';
import { Container } from '@material-ui/core';

import history from '../history';
import Header from './Header';
import Home from './Home';
import SignUp from './SignUp';
import Login from './Login';
import PastDue from './PastDue';
import MaintenanceContainer from './MaintenanceContainer';

class App extends React.Component {

  render() {
    return (
      <Container maxWidth='md'>
        <Router history={history}>
          <>
            <Header />
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/signup" component={SignUp} />
              <Route path="/login" component={Login} />
              <MaintenanceContainer />
            </Switch>
          </>
        </Router>
        
      </Container>
    )
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth,
  }
}

export default withRouter(connect(mapStateToProps, {})(App));