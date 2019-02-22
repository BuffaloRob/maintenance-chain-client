import {
  AUTHENTICATION_REQUEST,
  AUTHENTICATION_SUCCESS,
  AUTHENTICATION_FAILURE,
  LOGOUT
} from '../actions/types';

const INITIAL_STATE = {
  isAuthenticated: false,
  isAuthenticating: false,
  currentUser: {},
  token: null,
  errors: []
}

export default (state = INITIAL_STATE, action) => {
  switch(action.type) {
    case AUTHENTICATION_REQUEST:
      return { ...state, isAuthenticating: true }
    case AUTHENTICATION_SUCCESS:
      return { 
        ...state, 
        isAuthenticated: true,
        isAuthenticating: false,
        currentUser: action.user,
        token: action.token
      }
    case AUTHENTICATION_FAILURE:
      return {
        ...state,
        isAuthenticated: false,
        isAuthenticating: false,
        currentUser: {},
        token: null,
        errors: action.errors || []
      }
    case LOGOUT:
      return {
        ...state,
        isAuthenticated: false,
        isAuthenticating: false,
        currentUser: {},
        token: null
      }
    default:
      return state;
  }
}