import React from 'react';
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';

import RenderLoggedIn from './RenderLoggedIn';
import RenderLoggedOut from './RenderLoggedOut'
import { persistor } from '../../store';
import {
  maintenanceApi,
  useGetUserQuery,
  useLogoutMutation,
} from '../../store/api/maintenanceApi';
import { loggedOut, selectToken, selectCurrentUser, selectIsAuthenticated } from '../../store/slices/authSlice';

const HeaderContainer = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = useSelector(selectToken);
  const currentUser = useSelector(selectCurrentUser);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const [logout] = useLogoutMutation();

  // Refresh the user from the server; nothing to fetch without a token. Again
  // on coming back to the tab, as after verifying the email address in another.
  useGetUserQuery(undefined, { skip: !token, refetchOnFocus: true });

  const handleLogout = async e => {
    e.preventDefault();
    try {
      // Server logout failing or hanging must not block logging out locally
      await Promise.race([
        logout().unwrap(),
        new Promise(resolve => setTimeout(resolve, 3000)),
      ]);
    } catch (err) {}
    // Clear auth + all app state, then drop the RTK Query cache and persisted state
    dispatch(loggedOut());
    dispatch(maintenanceApi.util.resetApiState());
    persistor.purge();
    navigate('/');
  }

  if (isAuthenticated && currentUser.email) {
    return <RenderLoggedIn currentUser={currentUser} handleLogout={handleLogout}/>
  }
  return <RenderLoggedOut />
}

export default HeaderContainer;
