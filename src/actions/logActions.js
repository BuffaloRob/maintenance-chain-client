import history from '../history';
import * as types from './types';

import { fetchItems } from '../actions/itemActions';

export const createLog = (formValues, itemId, catId) => {
  return dispatch => {
    fetch(`${process.env.REACT_APP_API_URL}/items/${itemId}/categories/${catId}/logs`, {
      method: 'POST',
      body: JSON.stringify(formValues),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.jwt
      }
    })
      .then(resp => resp.json())
      .then(resp => {
        if (!resp.error) {
          dispatch({
            type: types.CREATE_LOG,
            payload: resp
          })
          history.push(`/item/${itemId}/category/${catId}`)
        }
      })
      .then(() => dispatch(fetchItems()))
      .catch(err => err)
  }
}

// export const fetchLogs = (catId, itemId) => async dispatch => {
//   const response = await apiURL.get(`/items/${itemId}/logs`, {params: { category_id: catId } });
//   dispatch({ type: types.FETCH_LOGS, payload: response.data });
// }

// export const fetchLog = (id, itemId) => async dispatch => {
//   const response = await apiURL.get(`/items/${itemId}/logs/${id}`);
//   dispatch({ type: types.FETCH_LOG, payload: response.data });
// }

// export const editLog = (formValues, id, catId, itemId) => async dispatch => {
//   const response = await apiURL.put(`/items/${itemId}/categories/${catId}/logs/${id}`, formValues);
//   dispatch(fetchItems());
//   dispatch({ type: types.EDIT_LOG, payload: response.data });
//   history.push(`/item/${itemId}/category/${catId}`);
// }

export const editLog = (formValues, id, catId, itemId) => {
  return dispatch => {
    fetch(`${process.env.REACT_APP_API_URL}/items/${itemId}/categories/${catId}/logs/${id}`, {
      method: 'PUT',
      body: JSON.stringify(formValues),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.jwt
      }
    })
      .then(resp => resp.json())
      .then(resp => {
        if (!resp.error) {
          dispatch({
            type: types.EDIT_LOG,
            payload: resp
          })
          history.push(`/item/${itemId}/category/${catId}`)
        }
      })
      .then(() => dispatch(fetchItems()))
      .catch(err => err)
  }
}

// export const deleteLog = (id, catId, itemId) => async dispatch => {
//   await apiURL.delete(`/items/${itemId}/categories/${catId}/logs/${id}`);
//   dispatch(fetchItems());
//   dispatch({ type: types.DELETE_LOG, payload: id });
//   history.push(`/item/${itemId}/category/${catId}`);
// }

export const deleteLog = (id, catId, itemId) => {
  return dispatch => {
    fetch(`${process.env.REACT_APP_API_URL}/items/${itemId}/categories/${catId}/logs/${id}`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.jwt
      }
    })
      .then(() => {
        dispatch({
          type: types.DELETE_LOG,
          payload: id
        })
        history.push(`/item/${itemId}/category/${catId}`);
      })
      .then(() => dispatch(fetchItems()))
      .catch(err => err)
  }
}
