import React from 'react';
import { connect } from 'react-redux';

import RenderLoggedIn from './RenderLoggedIn';
import RenderLoggedOut from './RenderLoggedOut'
import { logout, fetchUser } from '../../actions/authActions';

import { useAuth0 } from "../../react-auth0-spa";

const HeaderContainer = () => {
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();

  return (
    <div>
      {!isAuthenticated && (
        <RenderLoggedOut />
        // <button onClick={() => loginWithRedirect({})}>Log in</button>
      )}
      {isAuthenticated && <RenderLoggedIn />}
    </div>
  );
};

export default HeaderContainer;

// class HeaderContainer extends React.Component {
//   const { isAuthenticated, loginWithRedirect, logout } = useAuth0();

//   componentDidMount() {
//     this.props.fetchUser();
//   }

//   handleLogout = e => {
//     e.preventDefault();
//     this.props.logout();
//   }

//   render() {
//       if (
//         this.props.isAuthenticated &&
//         this.props.currentUser.email
//       ) {
//         return <RenderLoggedIn currentUser={this.props.currentUser} handleLogout={this.handleLogout}/>
//       } else {
//         return <RenderLoggedOut />
//       }
//   }
// }

// const mapStateToProps = state => {
//   return { 
//     isAuthenticated: state.auth.isAuthenticated,
//     currentUser: state.auth.currentUser
//   }
// }

// export default connect(mapStateToProps, { logout, fetchUser })(HeaderContainer);