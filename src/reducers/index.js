import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import authReducer from './authReducer';
import itemReducer from './itemReducer';

export default combineReducers({
  google: googleReducer,
  form: formReducer,
  items: itemReducer,
});