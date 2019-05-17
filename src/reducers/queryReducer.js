import _ from 'lodash';

import { FETCH_PAST_DUE } from '../actions/types';

export default (state = {}, action) => {
  switch (action.type) {
    case FETCH_PAST_DUE:
      return { ...state, ..._.mapKeys(action.payload, 'id') };
    default:
      return state;
  }
}