import { SELECT_CATEGORY } from '../actions/types';

export default (state = {}, action) => {
  switch (action.type) {
    case SELECT_CATEGORY:
      return Object.assign({}, state, action.payload)
    default:
      return state
  }
}