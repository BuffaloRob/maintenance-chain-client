import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import storage from 'redux-persist/lib/storage/session';

import authReducer from './authReducer';
import itemReducer from './itemReducer';
import categoryReducer from './categoryReducer';
import logReducer from './logReducer';

const appReducer = combineReducers({
  auth: authReducer,
  form: formReducer, items: itemReducer,
  categories: categoryReducer,
  logs: logReducer
})

// this will reset all state upon logout, stops persist from keeping data that shouldn't be there (i.e. logging in as a different user)
const rootReducer = (state, action) => {
  if (action.type === 'CLEAR_DATA') {
    storage.removeItem('persist:root')
    state = undefined
  }

  return appReducer(state, action)
}

export default rootReducer
