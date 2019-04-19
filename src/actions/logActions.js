import history from '../history';
import apiURL from '../apis/maintenance';
import * as types from './types';

export const createLog = formValues => async (dispatch, getState) => {
  const user_id = getState().auth.currentUser.user_id;
  const response = await apiURL.post('/logs', { ...formValues, user_id });
  dispatch({ type: types.CREATE_LOG, payload: response.data });
  history.push('/');
};

export const fetchLogs = () => async dispatch => {
  const response = await apiURL.get('/logs');
  dispatch({ type: types.FETCH_LOGS, payload: response.data });
}

export const fetchLog = id => async dispatch => {
  const response = await apiURL.get(`/logs/${id}`);
  dispatch({ type: types.FETCH_LOG, payload: response.data });
}

export const editLog = (id, formValues) => async dispatch => {
  const response = await apiURL.put(`/logs/${id}`, formValues);
  dispatch({ type: types.EDIT_LOG, payload: response.data });
  history.push('/');
}

export const deleteLog = id => async dispatch => {
  await apiURL.delete(`/logs/${id}`);
  dispatch({ type: types.DELETE_LOG, payload: id });
  history.push('/');
}


