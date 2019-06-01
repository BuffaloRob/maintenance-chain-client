import { SELECT_ITEM, SELECT_CATEGORY, SELECT_LOG, SELECT_ITEM_FOR_EDITED_CATEGORY, UPDATE_SELECTED_ITEM_ON_CAT_EDIT, SELECT_CATEGORY_ID } from './types';
import apiURL from '../apis/maintenance';


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

export const selectItemOnCatEdit = id => async dispatch => {
  const response = await apiURL.get(`/items/${id}`);
  // debugger
  dispatch({ type: SELECT_ITEM_FOR_EDITED_CATEGORY, payload: response.data });
}

export const getItem = id => async dispatch => {
  const response = await apiURL.get(`/items/${id}`);
  // debugger
  dispatch({ type: UPDATE_SELECTED_ITEM_ON_CAT_EDIT, payload: response.data });
}

export const categoryIdSelector = (catId, itemId) => dispatch => {
  dispatch({ type: SELECT_CATEGORY_ID, payload: catId })
}