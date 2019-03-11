import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import authReducer from './authReducer';
import itemReducer from './itemReducer';
import googleReducer from './googleReducer';

export default combineReducers({
  // auth: authReducer,
  auth: googleReducer,
  form: formReducer,
  items: itemReducer,
});