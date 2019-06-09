import { SELECT_ITEM, SELECT_CATEGORY, SELECT_LOG } from './types';

export const itemSelector = item => dispatch => {
  console.log(`item Selected: ${item.id}`)
  dispatch({ type: SELECT_ITEM, payload: item })
}

export const categorySelector = (cat, itemId) => dispatch => {
  dispatch({ type: SELECT_CATEGORY, payload: cat })  
}

export const logSelector = (log, itemId) => dispatch => {
  dispatch({ type: SELECT_LOG, payload: log }) 
}