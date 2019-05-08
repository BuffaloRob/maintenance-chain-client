import history from '../history';
import apiURL from '../apis/maintenance';
import * as types from './types';

export const createLog = (formValues, itemId) => async dispatch => {
  const response = await apiURL.post(`/items/${itemId}/logs`, { ...formValues });
  dispatch({ type: types.CREATE_LOG, payload: response.data });
  history.push(`/items/${itemId}`);
};

export const fetchLogs = itemId => async dispatch => {
  const response = await apiURL.get(`/items/${itemId}/logs`);
  dispatch({ type: types.FETCH_CATEGORIES, payload: response.data });
}

export const fetchLog = (id, itemId) => async dispatch => {
  const response = await apiURL.get(`/items/${itemId}/logs/${id}`);
  dispatch({ type: types.FETCH_LOG, payload: response.data });
}

export const editLog = (formValues, id, itemId) => async dispatch => {
  const response = await apiURL.put(`/items/${itemId}/logs/${id}`, formValues);
  dispatch({ type: types.EDIT_LOG, payload: response.data });
  history.push(`/items/${itemId}`);
}

export const deleteLog = (id, itemId) => async dispatch => {
  await apiURL.delete(`/items/${itemId}/logs/${id}`);
  dispatch({ type: types.DELETE_LOG, payload: id });
  history.push(`/items/${itemId}`);
}


