import _ from 'lodash';

import {
  CREATE_LOG,
  FETCH_LOG,
  FETCH_LOGS,
  DELETE_LOG,
  EDIT_LOG,
} from '../actions/types'

export default (state = {}, action) => {
  switch (action.type) {
    case FETCH_LOG:
      return { ...state, [action.payload.id]: action.payload };
    case CREATE_LOG:
      return { ...state, [action.payload.id]: action.payload };
    case EDIT_LOG:
      return { ...state, [action.payload.id]: action.payload };
    case DELETE_LOG:
      return _.omit(state, action.payload);
    case FETCH_LOGS:
      return { ...state, ..._.mapKeys(action.payload, 'id') };
    default:
      return state;
  }
}