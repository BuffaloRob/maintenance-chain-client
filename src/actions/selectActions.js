import history from '../history';
import { SELECT_ITEM, SELECT_CATEGORY, SELECT_LOG } from './types';

export const selectItem = item => dispatch => {
  dispatch({ type: SELECT_ITEM, payload: item })
}

export const selectCategory = (cat, itemId) => dispatch => {
  dispatch({ type: SELECT_CATEGORY, payload: cat })  
}

export const selectLog = (log, itemId) => dispatch => {
  dispatch({ type: SELECT_LOG, payload: log }) 
}