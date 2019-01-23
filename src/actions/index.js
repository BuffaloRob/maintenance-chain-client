import history from '../history';
import maintenance from '../apis/maintenance';
import { SIGN_IN, SIGN_OUT } from './types';

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
  maintenance.post('/maintenance', formValues);
};
