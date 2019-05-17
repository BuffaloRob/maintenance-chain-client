import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { logout, fetchUser } from '../actions/authActions';

class Header extends React.Component {

  componentDidMount() {
    this.props.fetchUser();
  }

  handleLogout = e => {
    e.preventDefault();
    this.props.logout();
  }

  renderAuthenticated() {
    // if (this.props.currentUser.id) {
    if (this.props.isAuthenticated) {
      return (
        <>
          <Link to='/pastdue' className='item'>
            Past Due
          </Link>
          <Link to='/' className='item'>
            Home
          </Link>
          <li onClick={(e) => this.handleLogout(e)} className='item pointing'>
            Log out
          </li>
          <li className='item'
            >Welcome {this.props.currentUser.email}
          </li>
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
            <li className='item'>
              Please Login
            </li>
          </>
      )
    }
  }

  render() {
    return (
      <div className='ui secondary pointing menu'>
        <Link to='/items' className='item'>
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
  return { 
    isAuthenticated: state.auth.isAuthenticated,
    currentUser: state.auth.currentUser
  }
}

export default connect(mapStateToProps, { logout, fetchUser })(Header);