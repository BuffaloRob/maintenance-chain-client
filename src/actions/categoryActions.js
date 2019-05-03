import history from '../history';
import apiURL from '../apis/maintenance';
import * as types from './types';

export const createCategory = (formValues, itemId) => async dispatch => {
  const response = await apiURL.post(`/items/${itemId}/categories`, { ...formValues});
  dispatch({ type: types.CREATE_CATEGORY, payload: response.data });
  history.push(`/items/${itemId}`);
};

export const fetchCategories = itemId => async dispatch => {
  const response = await apiURL.get(`/items/${itemId}/categories`);
  dispatch({ type: types.FETCH_CATEGORIES, payload: response.data });
}

export const fetchCategory = (id, itemId) => async dispatch => {
  const response = await apiURL.get(`/items/${itemId}/categories/${id}`);
  dispatch({ type: types.FETCH_CATEGORY, payload: response.data });
}

export const editCategory = (formValues, id, itemId) => async dispatch => {
  const response = await apiURL.put(`/items/${itemId}/categories/${id}`, formValues);
  dispatch({ type: types.EDIT_CATEGORY, payload: response.data });
  history.push(`/items/${itemId}`);
}

export const deleteCategory = (id, itemId) => async dispatch => {
  await apiURL.delete(`/items/${itemId}/categories/${id}`);
  dispatch({ type: types.DELETE_CATEGORY, payload: id });
  history.push(`/items/${itemId}`);
}


