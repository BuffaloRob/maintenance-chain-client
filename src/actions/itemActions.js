import history from '../history';
import apiURL from '../apis/maintenance';
import * as types from './types';

// export const createItem = formValues => async (dispatch, getState) => {
//   const user_id = getState().auth.currentUser.id;
//   const response = await apiURL.post('/items', { ...formValues, user_id });
//   dispatch({ type: types.CREATE_ITEM, payload: response.data });
//   history.push('/items');
// };
const HEADERS = {
  'Accept': 'application/json',
  'Content-Type': 'application/json',
  'Authorization': 'Bearer ' + localStorage.jwt
}

export const createItem = formValues => {
  return dispatch => {
    fetch(`${process.env.REACT_APP_API_URL}/items`, { 
      method:'POST',
      body: JSON.stringify(formValues),
      headers: HEADERS
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

// export const fetchItem = id => async dispatch => {
//   const response = await apiURL.get(`/items/${id}`);
//   dispatch({ type: types.FETCH_ITEM, payload: response.data });
// }

// export const editItem = (id, formValues) => async dispatch => {
//   const response = await apiURL.put(`/items/${id}`, formValues);
//   dispatch({ type: types.EDIT_ITEM, payload: response.data });
//   history.push('/items');
// }

export const editItem = (id, formValues) => {
  return dispatch => {
    fetch(`${process.env.REACT_APP_API_URL}/items/${id}`, {
      method: 'PUT',
      body: JSON.stringify(formValues),
      headers: HEADERS
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

export const deleteItem = id => async dispatch => {
  await apiURL.delete(`/items/${id}`);
  dispatch({ type: types.DELETE_ITEM, payload: id });
  history.push('/items');
}

// export const fetchItems = () => async dispatch => {
//   const response = await apiURL.get('/items');
//   dispatch({ type: types.FETCH_ITEMS, payload: response.data })
// }

export const fetchItems = () => {
  let data = {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.jwt
      // 'Authorization': sessionStorage.jwt
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
