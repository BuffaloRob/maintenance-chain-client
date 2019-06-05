import history from '../history';
import apiURL from '../apis/maintenance';
import * as types from './types';

import { fetchItems } from '../actions/itemActions';

export const createLog = (formValues, itemId, catId) => async dispatch => {
  // debugger
  const response = await apiURL.post(`/items/${itemId}/categories/${catId}/logs`, {...formValues });
  dispatch(fetchItems());
  dispatch({ type: types.CREATE_LOG, payload: response.data });
  history.push(`/item/${itemId}/categories/${catId}`);
};

export const fetchLogs = (catId, itemId) => async dispatch => {
  const response = await apiURL.get(`/items/${itemId}/logs`, {params: { category_id: catId } });
  dispatch({ type: types.FETCH_LOGS, payload: response.data });
}

export const fetchLog = (id, itemId) => async dispatch => {
  const response = await apiURL.get(`/items/${itemId}/logs/${id}`);
  dispatch({ type: types.FETCH_LOG, payload: response.data });
}

export const editLog = (formValues, id, catId, itemId) => async dispatch => {
  const response = await apiURL.put(`/items/${itemId}/categories/${catId}/logs/${id}`, formValues);
  dispatch(fetchItems());
  //Change dispatch to use the selectedLog Reducer
  dispatch({ type: types.EDIT_LOG, payload: response.data });
  history.push(`/item/${itemId}`);
}

export const deleteLog = (id, catId, itemId) => async dispatch => {
  await apiURL.delete(`/items/${itemId}/categories/${catId}/logs/${id}`);
  dispatch(fetchItems());
  dispatch({ type: types.DELETE_LOG, payload: id });
  history.push(`/item/${itemId}`);
}


