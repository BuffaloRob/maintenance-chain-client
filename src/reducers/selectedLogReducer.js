import { SELECT_LOG } from '../actions/types';

export default (state = {}, action) => {
  switch (action.type) {
    case SELECT_LOG:
      return Object.assign({}, state, action.payload)
    default:
      return state
  }
}