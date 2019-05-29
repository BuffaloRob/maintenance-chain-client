import { SELECT_ITEM, SELECT_ITEM_FOR_EDITED_CATEGORY } from '../actions/types';

export default (state = {}, action) => {
  switch (action.type) {
    case SELECT_ITEM:
      return Object.assign({}, state, action.payload)
    case SELECT_ITEM_FOR_EDITED_CATEGORY:
      return Object.assign({}, state, action.payload)
    default:
      return state
  }
}