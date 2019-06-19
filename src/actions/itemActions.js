import history from '../history';
import apiURL from '../apis/maintenance';
import * as types from './types';

// const API = "http://localhost:3000/api/v1"
const API = 'https://maintenance-chain-api.herokuapp.com/api/v1'

export const createItem = formValues => async (dispatch, getState) => {
  const user_id = getState().auth.currentUser.id;
  const response = await apiURL.post('/items', { ...formValues, user_id });
  dispatch({ type: types.CREATE_ITEM, payload: response.data });
  history.push('/items');
};

export const fetchItem = id => async dispatch => {
  const response = await apiURL.get(`/items/${id}`);
  dispatch({ type: types.FETCH_ITEM, payload: response.data });
}

export const editItem = (id, formValues) => async dispatch => {
  const response = await apiURL.put(`/items/${id}`, formValues);
  dispatch({ type: types.EDIT_ITEM, payload: response.data });
  history.push('/items');
}

export const deleteItem = id => async dispatch => {
  await apiURL.delete(`/items/${id}`);
  dispatch({ type: types.DELETE_ITEM, payload: id });
  history.push('/items');
}

export const fetchItems = () => {
  let data = {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + sessionStorage.jwt
      // 'Authorization': sessionStorage.jwt
    }
  }
  return dispatch => {
    fetch(`${API}/items`, data)
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

// export const fetchItems = () => async dispatch => {
//  const response = await apiURL.get('/items');
//  dispatch({ type: types.FETCH_ITEMS, payload: response.data })
// }
