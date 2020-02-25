import { AUTHENTICATION_SUCCESS, AUTHENTICATION_FAILURE, LOGOUT } from '../actions/types';

const INITIAL_STATE = {
  currentUser: {},
  // isAuthenticated: false
}

export default (state = INITIAL_STATE, action) => {
  switch(action.type) {
    case AUTHENTICATION_SUCCESS:
      return { 
        ...state, 
        currentUser: action.payload, 
        // isAuthenticated: true 
      }
    case AUTHENTICATION_FAILURE:
      return {
        ...state,
        currentUser: {},
        // isAuthenticated: false
      }
    case LOGOUT:
      return {
        ...state,
        currentUser: {},
        // isAuthenticated: false
      }
    default:
      return state;
  }
}