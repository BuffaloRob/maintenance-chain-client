import { reducer as formReducer } from 'redux-form';

// Remaining legacy reducers (redux-form), registered in the RTK store
// (src/store/index.js), which also handles the reset on logout.
const legacyReducers = {
  form: formReducer,
}

export default legacyReducers
