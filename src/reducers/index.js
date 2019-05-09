import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import authReducer from './authReducer';
import itemReducer from './itemReducer';
import categoryReducer from './categoryReducer';
import logReducer from './logReducer';

export default combineReducers({
  auth: authReducer,
  form: formReducer,
  items: itemReducer,
  categories: categoryReducer,
  logs: logReducer
});