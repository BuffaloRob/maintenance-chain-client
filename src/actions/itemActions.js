import history from '../history';
import * as types from './types';

export const createItem = formValues => {
  return dispatch => {
    fetch(`${process.env.REACT_APP_API_URL}/items`, { 
      method:'POST',
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
            type: types.CREATE_ITEM,
            payload: resp
          })
          history.push('/items');
        }
      })
      .catch(err => err)
  }
}

export const editItem = (id, formValues) => {
  return dispatch => {
    fetch(`${process.env.REACT_APP_API_URL}/items/${id}`, {
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
            type: types.EDIT_ITEM,
            payload: resp
          })
          history.push('/items');
        }
      })
      .catch(err => err)
  }
}

export const deleteItem = id => {
  return dispatch => {
    fetch(`${process.env.REACT_APP_API_URL}/items/${id}`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.jwt
      }
    })
      .then(() => {
        dispatch({
          type: types.DELETE_ITEM,
          payload: id
        })
        history.push('/items');
      })
      .catch(err => err)
  }
}

export const fetchItems = () => {
  let data = {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.jwt
    }
  }
  return dispatch => {
    fetch(`${process.env.REACT_APP_API_URL}/items`, data)
      .then(resp => resp.json())
      .then(resp => {
        if (!resp.error) {
          dispatch({
            type: types.FETCH_ITEMS,
            payload: resp
          })
        }
      })
      .catch(err => err)
  }
}
