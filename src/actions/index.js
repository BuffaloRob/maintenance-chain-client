import history from '../history';
import maintenance from '../apis/maintenance';
import { 
  SIGN_IN, 
  SIGN_OUT, 
  CREATE_ITEM,
  FETCH_ITEM,
  FETCH_ITEMS,
  DELETE_ITEM,
  EDIT_ITEM ,
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
  dispatch({ type: CREATE_ITEM, payload: response.data});

};

//lecture 240 at 5:50