import { SET_USER, LOGOUT } from '../actions/types';

const INITIAL_STATE = {
  currentUser: {},
  isAuthenticated: false
}

export default (state = INITIAL_STATE, action) => {
  switch(action.type) {
    case SET_USER:
      return { 
        ...state, 
        currentUser: action.payload, 
        isAuthenticated: true 
      }
    case LOGOUT:
      return {
        ...state,
        currentUser: {},
        isAuthenticated: false
      }
    default:
      return state;
  }
}