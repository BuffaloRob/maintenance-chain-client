import _ from 'lodash';

import { FETCH_UPCOMING } from '../actions/types';

export default (state = {}, action) => {
  switch (action.type) {
    case FETCH_UPCOMING:
      return { ...state, ..._.mapKeys(action.payload, 'id') };
    default:
      return state;
  }
}