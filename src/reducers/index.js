import { reducer as formReducer } from 'redux-form';

import upcomingReducer from './upcomingReducer';
import pastDueReducer from './pastDueReducer';

// Legacy reducers for domains not yet migrated to RTK Query. They are
// registered in the RTK store (src/store/index.js), which also handles the
// CLEAR_DATA reset. Auth now lives in src/store/slices/authSlice.js.
const legacyReducers = {
  form: formReducer,
  pastDue: pastDueReducer,
  upcoming: upcomingReducer,
}

export default legacyReducers
