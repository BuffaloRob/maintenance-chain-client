import history from '../history';
import { SELECT_ITEM } from './types';

export const selectItem = (item) => dispatch => {
  debugger
  dispatch({ type: SELECT_ITEM, payload: item})
  history.push(`/items/${item.id}`)
}