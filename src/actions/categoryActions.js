import history from '../history';
import * as types from './types';

import { fetchItems } from '../actions/itemActions';

export const createCategory = (formValues, itemId) => {
  return dispatch => {
    fetch(`${process.env.REACT_APP_API_URL}/items/${itemId}/categories`, {
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
            type: types.CREATE_CATEGORY,
            payload: resp
          })
          history.push(`/item/${itemId}`)
        }
      })
      .then(() => dispatch(fetchItems()))
      .catch(err => err)
  }
}

export const editCategory = (formValues, id, itemId) => {
  return dispatch => {
    fetch(`${process.env.REACT_APP_API_URL}/items/${itemId}/categories/${id}`, {
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
            type: types.EDIT_CATEGORY,
            payload: resp
          })
          history.push(`/item/${itemId}`)
        }
      })
      .then(() => dispatch(fetchItems()))
      .catch(err => err)
  }
}

export const deleteCategory = (id, itemId) => {
  return dispatch => {
    fetch(`${process.env.REACT_APP_API_URL}/items/${itemId}/categories/${id}`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.jwt
      }
    })
      .then(() => {
        dispatch({
          type: types.DELETE_CATEGORY,
          payload: id
        })
        history.push(`/item/${itemId}`);
      })
      .then(() => dispatch(fetchItems()))
      .catch(err => err)
  }
}