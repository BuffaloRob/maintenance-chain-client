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

  render() {
    return (
      <div className='ui secondary pointing menu'>
        <Link to='/' className='item'>
          M/C
        </Link>
        <div className='right menu'>
          <Link to='/' className='item'>
            All Items
          </Link>
          <Link to='/signup' className='item'>
            Sign Up
          </Link>
          <Link to='/login' className='item'>
            Log In
          </Link>
          <li onClick={(e) => this.handleLogout(e)}className='item pointing'>Log out</li>
          <Welcome />
        </div>

      </div>
    )
  }
  
}

export default connect(null, { logout })(Header);