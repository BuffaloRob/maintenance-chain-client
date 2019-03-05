import history from '../history';
import apiURL from '../apis/maintenance';
import * as types from './types';

export const createItem = formValues => async (dispatch, getState) => {
  const user_id = getState().auth.currentUser.id;
  const response = await apiURL.post('/items', { ...formValues, user_id });
  dispatch({ type: types.CREATE_ITEM, payload: response.data });
  history.push('/');
};

export const fetchItems = () => async dispatch => {
  const response = await apiURL.get('/items');
  dispatch({ type: types.FETCH_ITEMS, payload: response.data });
}

export const fetchItem = id => async dispatch => {
  const response = await apiURL.get(`/items/${id}`);
  dispatch({ type: types.FETCH_ITEM, payload: response.data });
}

export const editItem = (id, formValues) => async dispatch => {
  const response = await apiURL.put(`/items/${id}`, formValues);
  dispatch({ type: types.EDIT_ITEM, payload: response.data });
  history.push('/');
}

export const deleteItem = id => async dispatch => {
  await apiURL.delete(`/items/${id}`);
  dispatch({ type: types.DELETE_ITEM, payload: id });
  history.push('/');
}


