import history from '../history';
import apiURL from '../apis/maintenance';
import * as types from './types';


export const signup = user => async dispatch => {
  const newUser = user
  const axiosConfig = {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({user: user})
  }
  const response = await apiURL.post('/users', axiosConfig);
  dispatch(authenticate({
    name: newUser.name,
    email: newUser.email,
    password: newUser.password,
    payload: response.data})
  );
}

export const authenticate = credentials => async dispatch => {
  const axiosConfig = {
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ auth: credentials })
  }
  dispatch(authRequest());
  const response = await apiURL.post('/user_token', axiosConfig);
  // to be continued ...

}

export const createItem = formValues => async (dispatch, getState) => {
  const { userId } = getState().items;
  const response = await apiURL.post('/items', { ...formValues, userId });
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
}

export const deleteItem = id => async dispatch => {
  await apiURL.delete(`/items/${id}`);
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
