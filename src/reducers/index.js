import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import storage from 'redux-persist/lib/storage/session';

import authReducer from './authReducer';
import itemReducer from './itemReducer';
import selectedItemReducer from './selectedItemReducer';
import selectedCategoryReducer from './selectedCategoryReducer';
import selectedLogReducer from './selectedLogReducer';
import upcomingReducer from './upcomingReducer';
import pastDueReducer from './pastDueReducer';

const appReducer = combineReducers({
  auth: authReducer,
  form: formReducer,
  items: itemReducer,
  selectedItem: selectedItemReducer,
  selectedCategory: selectedCategoryReducer,
  selectedLog: selectedLogReducer,
  pastDue: pastDueReducer,
  upcoming: upcomingReducer,
})

// this will reset all state upon logout. It stops persist from keeping data that shouldn't be there (i.e. logging in as a different user)
const rootReducer = (state, action) => {
  if (action.type === 'CLEAR_DATA') {
    storage.removeItem('persist:root')
    state = undefined
  }

  return appReducer(state, action)
}

export default rootReducer
