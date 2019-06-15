import history from '../history';
import apiURL from '../apis/maintenance';
import * as types from './types';

import { fetchItems } from '../actions/itemActions';

export const createCategory = (formValues, itemId) => async dispatch => {
  const response = await apiURL.post(`/items/${itemId}/categories`, { ...formValues});
  // dispatching fetchItems to update state to display correctly in the CategoryList route
  dispatch(fetchItems());
  dispatch({ type: types.CREATE_CATEGORY, payload: response.data });  
  history.push(`/item/${itemId}`);
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
  dispatch(fetchItems())
  dispatch({ type: types.EDIT_CATEGORY, payload: response.data })
  history.push(`/item/${itemId}`);
}

export const deleteCategory = (id, itemId) => async dispatch => {
  await apiURL.delete(`/items/${itemId}/categories/${id}`);
  // dispatching fetchItems to update state to display correctly in the CategoryList route
  dispatch(fetchItems());
  dispatch({ type: types.DELETE_CATEGORY, payload: id });
  history.push(`/item/${itemId}`);
}