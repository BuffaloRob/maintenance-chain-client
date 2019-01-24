import history from '../history';
import maintenance from '../apis/maintenance';
import { 
  SIGN_IN, 
  SIGN_OUT, 
  CREATE_ITEM,
  FETCH_ITEM,
  FETCH_ITEMS,
  DELETE_ITEM,
  EDIT_ITEM,
} from './types';

export const signIn = userId => {
  return {
    type: SIGN_IN,
    payload: userId
  };
};

export const signOut = () => {
  return {
    type: SIGN_OUT
  };
};

export const createItem = formValues => async dispatch => {
  const response = await maintenance.post('/maintenance', formValues);
  dispatch({ type: CREATE_ITEM, payload: response.data });

};

export const fetchItems = () => async dispatch => {
  const response = await maintenance.get('/maintenance');
  dispatch({ type: FETCH_ITEMS, payload: response.data });
}

export const fetchItem = id => async dispatch => {
  const response = await maintenance.get(`/maintenance/${id}`);
  dispatch({ type: FETCH_ITEM, payload: response.data });
}

export const editItem = (id, formValues) => async dispatch => {
  const response = await maintenance.put(`/maintenance/${id}`, formValues);
  dispatch({ type: EDIT_ITEM, payload: response.data });
}

export const deleteItem = id => async dispatch => {
  await maintenance.delete(`/streams/${id}`);
  dispatch({ type: DELETE_ITEM, payload: id });
}