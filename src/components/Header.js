import React from 'react';
import { Link } from 'react-router-dom';

import Welcome from './Welcome';

const Header = () => {
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
        <Welcome />
      </div>
     
    </div>
  )
}

export default Header;