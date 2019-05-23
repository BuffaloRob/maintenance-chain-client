import history from '../history';
import { SELECT_ITEM, SELECT_CATEGORY } from './types';

export const selectItem = (item) => dispatch => {
  dispatch({ type: SELECT_ITEM, payload: item})
  history.push(`/items/${item.id}`)
}

export const selectCategory = (cat) => dispatch => {
  debugger
  dispatch({ type: SELECT_CATEGORY, payload: cat })
  history.push(`/categories/${cat.id}`)
}