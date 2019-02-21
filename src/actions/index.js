import history from '../history';
import apiURL from '../apis/maintenance';
import * as types from './types';

export const signIn = userId => {
  return {
    type: types.SIGN_IN,
    payload: userId
  };
};

export const signOut = () => {
  return {
    type: types.SIGN_OUT
  };
};

export const createItem = formValues => async (dispatch, getState) => {
  const { userId } = getState().auth;
  const response = await maintenance.post('/apiURL', { ...formValues, userId });
  dispatch({ type: types.CREATE_ITEM, payload: response.data });
  history.push('/');
};

export const fetchItems = () => async dispatch => {
  const response = await maintenance.get('/apiURL');
  dispatch({ type: types.FETCH_ITEMS, payload: response.data });
}

export const fetchItem = id => async dispatch => {
  const response = await maintenance.get(`/apiURL/${id}`);
  dispatch({ type: types.FETCH_ITEM, payload: response.data });
}

export const editItem = (id, formValues) => async dispatch => {
  const response = await maintenance.put(`/apiURL/${id}`, formValues);
  dispatch({ type: types.EDIT_ITEM, payload: response.data });
}

export const deleteItem = id => async dispatch => {
  await maintenance.delete(`/apiURL/${id}`);
  dispatch({ type: types.DELETE_ITEM, payload: id });
}

export const authRequest = () => {
  return {
    type: types.AUTHENTICATION_REQUEST
  }
}

export const authSuccess = (user, token) => {
  return {
    type: types.AUTHENTICATION_SUCCESS,
    user: user,
    token: token
  }
}

export const authFailure = errors => {
  return {
    type: types.AUTHENTICATION_FAILURE,
    errors: errors
  }
}