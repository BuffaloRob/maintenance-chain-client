import history from '../history';
import apiURL from '../apis/maintenance';
import * as types from './types';

export const createCategory = formValues => async (dispatch, getState) => {
  const user_id = getState().auth.currentUser.user_id;
  const response = await apiURL.post('/categories', { ...formValues, user_id });
  dispatch({ type: types.CREATE_CATEGORY, payload: response.data });
  history.push('/');
};

export const fetchCategories = () => async dispatch => {
  const response = await apiURL.get('/categories');
  dispatch({ type: types.FETCH_CATEGORIES, payload: response.data });
}

export const fetchCategory = id => async dispatch => {
  const response = await apiURL.get(`/categories/${id}`);
  dispatch({ type: types.FETCH_CATEGORY, payload: response.data });
}

export const editCategory = (id, formValues) => async dispatch => {
  const response = await apiURL.put(`/categories/${id}`, formValues);
  dispatch({ type: types.EDIT_CATEGORY, payload: response.data });
  history.push('/');
}

export const deleteCategory = id => async dispatch => {
  await apiURL.delete(`/categories/${id}`);
  dispatch({ type: types.DELETE_CATEGORY, payload: id });
  history.push('/');
}


