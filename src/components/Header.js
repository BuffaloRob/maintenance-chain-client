import React from 'react';
import { connect } from 'react-redux';

import RenderLoggedIn from '../components/header/RenderLoggedIn';
import RenderLoggedOut from '../components/header/RenderLoggedOut'
import { logout, fetchUser } from '../actions/authActions';

class Header extends React.Component {

  componentDidMount() {
    this.props.fetchUser();
  }

  handleLogout = e => {
    e.preventDefault();
    this.props.logout();
  }

  render() {
      if (
        this.props.isAuthenticated &&
        this.props.currentUser.email
      ) {
        return <RenderLoggedIn currentUser={this.props.currentUser} handleLogout={this.handleLogout}/>
      } else {
        return <RenderLoggedOut />
      }
  }
}

const mapStateToProps = state => {
  return { 
    isAuthenticated: state.auth.isAuthenticated,
    currentUser: state.auth.currentUser
  }
}

export default connect(mapStateToProps, { logout, fetchUser })(Header);