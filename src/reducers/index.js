import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { persistCombineReducers } from 'redux-persist';
import storage from 'redux-persist/lib/storage/session';

import authReducer from './authReducer';
import itemReducer from './itemReducer';
import categoryReducer from './categoryReducer';
import logReducer from './logReducer';

const persistConfig = {
  key: 'root',
  storage,
}

const appReducer = persistCombineReducers(persistConfig, {
  auth: authReducer,
  form: formReducer,
  items: itemReducer,
  categories: categoryReducer,
  logs: logReducer
})

const rootReducer = (state, action) => {
  if (action.type === 'CLEAR_DATA') {
    storage.removeItem('persist:root')
    state = undefined
  }

  return appReducer(state, action)
}

export default rootReducer

// export default combineReducers({
//   auth: authReducer,
//   form: formReducer,
//   items: itemReducer,
//   categories: categoryReducer,
//   logs: logReducer
// });