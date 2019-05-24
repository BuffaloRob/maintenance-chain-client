import history from '../history';
import { SELECT_ITEM, SELECT_CATEGORY, SELECT_LOG } from './types';

export const selectItem = item => dispatch => {
  dispatch({ type: SELECT_ITEM, payload: item })
  history.push(`/item/${item.id}`)
}

export const selectCategory = (cat, itemId) => dispatch => {
  dispatch({ type: SELECT_CATEGORY, payload: cat })
  history.push(`/item/${itemId}/category/${cat.id}`)
}

export const selectLog = (log, itemId) => dispatch => {
  dispatch({ type: SELECT_LOG, payload: log })
  history.push(`/log/${log.id}`)
}