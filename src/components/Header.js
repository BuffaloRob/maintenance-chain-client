import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import Welcome from './Welcome';
import { logout } from '../actions/authActions';

class Header extends React.Component {

  handleLogout = e => {
    e.preventDefault();
    this.props.logout();
  }

  renderAuthenticated() {
    if (this.props.isAuthenticated) {
      return (
        <>
          <Link to='/items/new' className='item'>
            New Item
          </Link>
          <li onClick={(e) => this.handleLogout(e)} className='item pointing'>Log out</li>
          <Welcome />
        </>
      ) 
    } else {
      return (
          <>
            <Link to='/signup' className='item'>
              Sign Up
            </Link>
            <Link to='/login' className='item'>
              Log In
            </Link>
            <Welcome />
          </>
      )
    }
  }

  render() {
    return (
      <div className='ui secondary pointing menu'>
        <Link to='/' className='item'>
          M/C
        </Link>
        <div className='right menu'>
          {this.renderAuthenticated()}
        </div>
      </div>
    )
  }
  
}

const mapStateToProps = state => {
  return { isAuthenticated: state.auth.isAuthenticated }
}

export default connect(mapStateToProps, { logout })(Header);