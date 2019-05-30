import { SELECT_CATEGORY_ID } from '../actions/types';
export default (state = {}, action) => {
  
  switch (action.type) {
    case SELECT_CATEGORY_ID:
      debugger
      return Object.assign({}, state, action.payload)
    // return { ...state, ...action.payload };
    default:
      return state
  }
}