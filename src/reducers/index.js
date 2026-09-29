import { reducer as formReducer } from 'redux-form';

import itemReducer from './itemReducer';
import selectedItemReducer from './selectedItemReducer';
import selectedCategoryReducer from './selectedCategoryReducer';
import selectedLogReducer from './selectedLogReducer';
import upcomingReducer from './upcomingReducer';
import pastDueReducer from './pastDueReducer';

// Legacy reducers for domains not yet migrated to RTK Query. They are
// registered in the RTK store (src/store/index.js), which also handles the
// CLEAR_DATA reset. Auth now lives in src/store/slices/authSlice.js.
const legacyReducers = {
  form: formReducer,
  items: itemReducer,
  selectedItem: selectedItemReducer,
  selectedCategory: selectedCategoryReducer,
  selectedLog: selectedLogReducer,
  pastDue: pastDueReducer,
  upcoming: upcomingReducer,
}

export default legacyReducers
